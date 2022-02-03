import { Router } from 'express';
import { CompanyController } from '../../../controllers/admin';
import { exists, validation } from '../../../validations/category';
import status from '../../../validations/status';

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


const company: Router = Router();
const controller = new CompanyController();
company.post('/upload', upload.single('logo'), controller.upload);
company.get('/', controller.index);
company.get('/names', controller.names);
company.get('/:_id', exists, controller.findById);
company.post('/', upload.single('logo'), controller.create);
company.patch('/:_id', exists, validation, controller.updateById);
company.patch('/status/change/:_id', exists, status, controller.statusChange);
company.delete('/:_id', exists, controller.deleteById);
export default company;