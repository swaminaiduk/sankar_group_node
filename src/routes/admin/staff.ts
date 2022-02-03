import {Router} from 'express'
import {StaffController} from '../../controllers/admin'
// import { exists } from '../../validations/staff'; 


import * as multer from 'multer';
import * as path from "path";
import config from '../../config/app';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(path.resolve('./'), 'public/images/'));
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}_${Math.random().toString(36).substring(7)}_${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

const staff: Router = Router()
const controller = new StaffController
staff.post('/upload', upload.single('logo'), controller.upload);
staff.post('/login', controller.login)
staff.get('/emplist', controller.empList)
staff.get('/', controller.index)
staff.post('/',  controller.create);
staff.get('/dashboard',  controller.dashboard);
staff.delete('/:_id',  controller.deleteById);
staff.post('/company-brand',  controller.companyBrandEmployees);
staff.patch('/status/change/:_id',  controller.statusChange);
export default staff;