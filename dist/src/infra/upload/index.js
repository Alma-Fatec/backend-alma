"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const client_s3_1 = require("@aws-sdk/client-s3");
const multer_s3_1 = __importDefault(require("multer-s3"));
const error_1 = require("../../middlewares/error");
const fileFilters_1 = __importDefault(require("./fileFilters"));
const s3 = new client_s3_1.S3Client({
    region: process.env.AWS_DEFAULT_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const storage = (0, multer_s3_1.default)({
    s3,
    bucket: process.env.BUCKET_NAME,
    acl: 'public-read',
    contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
        cb(null, `${Date.now().toString()}-${file.originalname}`);
    },
});
const uploadService = (0, multer_1.default)({
    storage,
    fileFilter(req, file, callback) {
        if (!fileFilters_1.default[req.baseUrl.split('/')[1]](file.originalname)) {
            return callback(new error_1.ApiError(`Arquivos do tipo .${file.originalname.split('.')[1]} não são permitidos para esse recurso`, 400));
        }
        callback(null, true);
    },
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB,
    },
});
exports.default = uploadService;
