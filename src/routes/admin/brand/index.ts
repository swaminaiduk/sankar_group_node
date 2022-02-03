import { Router } from 'express';
import { BrandController } from '../../../controllers/admin';
// import { exists, validation } from '../../../validations/category';
// import status from '../../../validations/status';

import * as multer from 'multer';
import * as path from "path";
import config from '../../../config/app';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(path.resolve('./'), 'public/images/'));
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}_${Math.random().toString(36).substring(7)}_${file.originalname}`);
    }
});
const upload = multer({ storage: storage });


const brand: Router = Router();
const controller = new BrandController();

brand.post('/upload', upload.single('logo'), controller.upload);

brand.get('/', controller.index);
brand.get('/names', controller.names);
brand.post('/', controller.create);
brand.patch('/:_id', controller.updateById);
brand.delete('/:_id', controller.deleteById);
brand.patch('/status/change/:_id', controller.statusChange);
export default brand;
