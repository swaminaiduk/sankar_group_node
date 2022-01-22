import { Router } from 'express';
import { ImageController } from '../../../controllers/admin';
import * as multer from 'multer';
import * as path from "path";
import config from '../../../config/app';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(path.resolve('./'), 'public/' + config.IMAGE_PATH));
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}_${Math.random().toString(36).substring(7)}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });
const image: Router = Router();
const controller = new ImageController();
image.post('/', upload.single('image'), controller.upload);
export default image;
