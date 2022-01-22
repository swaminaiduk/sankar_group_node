import { Router } from 'express';
import BanerTypeController from '../../../controllers/admin/BanerTypeController';
import { exists, validation } from '../../../validations/baner-type';
import status from '../../../validations/status';

const banerType: Router = Router();

const controller = new BanerTypeController();

// -------------------------------------- Get Routes --------------------------------------

// List of banerType with paginate
banerType.get('/', controller.index);
banerType.get('/:_id', controller.findById);

// -------------------------------------- Post Routes --------------------------------------

// Create banerType
banerType.post('/', validation, controller.create);

// -------------------------------------- Patch Routes --------------------------------------

// Update banerType
banerType.patch('/:_id', exists, validation, controller.updateById);
banerType.patch('/image/:_id', exists, controller.updateImageById);
banerType.patch('/status/change/:_id', exists, status, controller.statusChange);

// -------------------------------------- Delete Routes --------------------------------------

// Delete banerType
banerType.delete('/:_id', exists, controller.deleteById);

export default banerType;
