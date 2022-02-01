import { Router } from 'express';
import { MediaController } from '../../../controllers/admin';
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
const controller = new MediaController();
image.get('/', controller.index);
image.post('/', upload.single('image'), controller.upload);
// image.post('/', upload.array("image", 2), controller.upload);
image.delete('/:_id', controller.deleteById);
export default image;