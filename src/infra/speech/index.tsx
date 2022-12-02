import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

class AzureTextToSpeech {
    private static instance: AzureTextToSpeech;
    private readonly audioPath = 'audio.wav';

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
            '<YOUR_SUBSCRIPTION_KEY>',
            '<YOUR_REGION>',
        );

        speechConfig.speechSynthesisLanguage = 'pt-BR';
        speechConfig.speechSynthesisVoiceName = 'pt-BR-DanielNeural';

        const audioConfig = sdk.AudioConfig.fromAudioFileOutput(this.audioPath);
        const synthesizer = new sdk.SpeechSynthesizer(
            speechConfig,
            audioConfig,
        );

        synthesizer.speakTextAsync(
            text,
            (result) => {
                if (
                    result.reason == sdk.ResultReason.SynthesizingAudioCompleted
                ) {
                    console.log('Audio synthesized to file: ' + this.audioPath);
                }
            },
            (error) => {
                console.log(error);
            },
        );

        synthesizer.close();

        return this.audioPath;
    }
}

export default AzureTextToSpeech;
