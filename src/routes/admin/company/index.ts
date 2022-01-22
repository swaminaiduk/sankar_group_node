import { Router } from 'express';
import { CompanyController } from '../../../controllers/admin';
import { exists, validation } from '../../../validations/category';
import status from '../../../validations/status';

const company: Router = Router();

const controller = new CompanyController();
company.get('/', controller.index);
company.get('/names', controller.names);
company.get('/:_id', exists, controller.findById);
company.post('/',  controller.create);
company.patch('/:_id', exists, validation, controller.updateById);
company.patch('/status/change/:_id', exists, status, controller.statusChange);
company.delete('/:_id', exists, controller.deleteById);

export default company;