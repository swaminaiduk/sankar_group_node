import { Router } from 'express';
import { BrandController } from '../../../controllers/admin';

const brand: Router = Router();

const controller = new BrandController();
brand.get('/', controller.index);
brand.get('/names', controller.names);
brand.post('/', controller.create);
brand.patch('/:_id', controller.updateById);
brand.delete('/:_id', controller.deleteById);
export default brand;
