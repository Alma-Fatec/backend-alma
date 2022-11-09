import multer from 'multer';
import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';
import { ApiError } from '../../middlewares/error';
import filters from './fileFilters';

const s3 = new S3Client({
    region: process.env.AWS_DEFAULT_REGION,
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

const uploadService = multer({
    storage,
    fileFilter(req, file, callback) {
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
    },
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB,
    },
});

export default uploadService;
