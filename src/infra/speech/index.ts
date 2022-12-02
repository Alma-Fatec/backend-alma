import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { uploadFile } from '../upload';
import { fstat, promises, readFile } from 'fs';
class AzureTextToSpeech {
    private static instance: AzureTextToSpeech;
    private readonly audioPath = './uploads';
    private readonly azureKey = process.env.SPEECH_KEY as string;
    private readonly azureRegion = process.env.AZURE_REGION as string;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    public static getInstance(): AzureTextToSpeech {
        if (!AzureTextToSpeech.instance) {
            AzureTextToSpeech.instance = new AzureTextToSpeech();
        }
        return AzureTextToSpeech.instance;
    }

    public async textToSpeech(text: string) {
        const speechConfig = sdk.SpeechConfig.fromSubscription(
            this.azureKey,
            this.azureRegion,
        );

        speechConfig.speechSynthesisLanguage = 'pt-BR';
        speechConfig.speechSynthesisVoiceName = 'pt-BR-BrendaNeural';

        const fileName = `audio-${Date.now().toString()}.mp3`;

        const audioConfig = sdk.AudioConfig.fromAudioFileOutput(
            `${this.audioPath}/${fileName}`,
        );
        const synthesizer = new sdk.SpeechSynthesizer(
            speechConfig,
            audioConfig,
        );


        synthesizer.speakTextAsync(
            text,
            async (result) => {
                //console.log(result);
                synthesizer.close();
                synthesizer.dispose();
            },
            (error) => {
                //conDate.now().toString()sole.log(error);
                synthesizer.close();
                synthesizer.dispose();
            },
        );

        // check if the file exists and its size is greater than 0
        // if not, wait 1 second and check again
        // if it exists, upload to s3 and return the url
        // if it doesn't exist after 10 seconds, throw an error
        let fileExists = false;
        let tries = 0;
        while (!fileExists && tries < 10) {
            try {
                const stats = await promises.stat(
                    `${this.audioPath}/${fileName}`,
                );
                if (stats.size > 0) {
                    fileExists = true;
                } else {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    tries++;
                }
            } catch (error) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                tries++;
            }
        }

        if (!fileExists) {
            throw new Error('File not found');
        }
        const url = await uploadFile(fileName, this.audioPath, 'audio/mp3');

        // wait 1 second to make sure the file is completely written
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return url;
    }
}

export default AzureTextToSpeech;
