import { Request } from 'express';
import multer from 'multer';
import path from 'path';
import { AppError } from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path.resolve(__dirname, '..', '..', '..', 'public', 'uploads'));
    },

    filename(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {

    const allowedExtensions = ['.png', '.jpg', '.webp', '.jfif'];
    const fileExtension = path.extname(file.originalname);

    if (!allowedExtensions.includes(fileExtension)) {
        throw new AppError('File extension not allowed', StatusCodes.BAD_REQUEST);
    }

    cb(null, true);

};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 4 * 1024 * 1024 }
});

export { upload };