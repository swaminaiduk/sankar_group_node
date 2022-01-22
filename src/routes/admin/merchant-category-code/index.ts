import { Router } from 'express';
import { MccController } from '../../../controllers/admin';
import { exists, validation } from '../../../validations/mcc';
import status from '../../../validations/status';
import verified from '../../../validations/verified';

const merchantCategoryCode: Router = Router();

const controller = new MccController();

// -------------------------------------- Get Routes --------------------------------------

// List of merchant category code with paginate
merchantCategoryCode.get('/', controller.index);

// Merchant category code list of Service
merchantCategoryCode.get('/dropdown', controller.dropdown);

// Merchant category code details
merchantCategoryCode.get('/:_id', exists, controller.findById);

// -------------------------------------- Post Routes --------------------------------------

// Create merchant category code
merchantCategoryCode.post('/', validation, controller.create);

// -------------------------------------- Patch Routes --------------------------------------

// Update merchant category code
merchantCategoryCode.patch('/:_id', exists, validation, controller.updateById);
merchantCategoryCode.patch('/status/change/:_id', exists, status, controller.statusChange);
merchantCategoryCode.patch('/verified/change/:_id', exists, verified, controller.verifiedChange);

// -------------------------------------- Delete Routes --------------------------------------

// Delete merchant category code
merchantCategoryCode.delete('/:_id', exists, controller.deleteById);

export default merchantCategoryCode;
