import { S3Client } from '@aws-sdk/client-s3';
import { S3 } from 'aws-sdk';
import { readFileSync } from 'fs';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import { ApiError } from '../../middlewares/error';
import filters from './fileFilters';

console.log(process.env.AWS_ENDPOINT);
const s3 = new S3Client({
    region: process.env.AWS_DEFAULT_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
});

const storage = multerS3({
    s3,
    bucket: process.env.BUCKET_NAME as string,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
        cb(null, `${Date.now().toString()}-${file.originalname}`);
    },
});

export async function uploadFile(fileName, filePath, mimeType) {
    const s3 = new S3({
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
        },
        params: { ACL: 'public-read' },
        // set content typez to auto to get the correct content type
        // based on the file extension
        convertResponseTypes: false,
    });

    const fullFilePath = path.resolve(filePath, fileName);

    const fileContent = readFileSync(fullFilePath);

    const params = {
        Bucket: process.env.BUCKET_NAME as string,
        Key: fileName,
        Body: fileContent,
    };

    return await (
        await s3.upload(params).promise()
    ).Location;
}

const uploadService = multer({
    storage,
    /*  fileFilter(req, file, callback) {
        if (!filters[req.baseUrl.split('/')[1]](file.originalname)) {
            return callback(
                new ApiError(
                    `Arquivos do tipo .${
                        file.originalname.split('.')[1]
                    } não são permitidos para esse recurso`,
                    400,
                ),
            );
        }

        callback(null, true);
    }, */
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB,
    },
});

export default uploadService;
