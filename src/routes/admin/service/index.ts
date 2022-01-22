import { Router } from 'express';
import { ServiceController } from '../../../controllers/admin';
import { exists, validation } from '../../../validations/service';
import status from '../../../validations/status';

const service: Router = Router();

const controller = new ServiceController();
// List of Service with paginate
service.get('/', controller.index);
// Service details
service.get('/:_id', exists, controller.findById);
service.get('/pg/dropdown', controller.dropdown);
// -------------------------------------- Post Routes --------------------------------------

// Create service
service.post('/', validation, controller.create);

// -------------------------------------- Patch Routes --------------------------------------

// Update service
service.patch('/:_id', exists, validation, controller.updateById);
service.patch('/status/change/:_id', exists, status, controller.statusChange);

// -------------------------------------- Delete Routes --------------------------------------

// Delete service
service.delete('/:_id', exists, controller.deleteById);

export default service;
