import { Router } from 'express';
import { MerchantController } from '../../../controllers/admin';
import { exists, validation } from '../../../validations/merchant';
import status from '../../../validations/status';
import verified from '../../../validations/verified';

const merchant: Router = Router();

const controller = new MerchantController();

// -------------------------------------- Get Routes --------------------------------------

// List of merchant with paginate
merchant.get('/', controller.index);

// merchant details
merchant.get('/:_id', exists, controller.findById);

// -------------------------------------- Post Routes --------------------------------------

// Create merchant
merchant.post('/', validation, controller.create);

// -------------------------------------- Patch Routes --------------------------------------

// Update merchant
merchant.patch('/:_id', exists, validation, controller.updateById);
merchant.patch('/status/change/:_id', exists, status, controller.statusChange);
merchant.patch('/verified/change/:_id', exists, verified, controller.verifiedChange);

// -------------------------------------- Delete Routes --------------------------------------

// Delete merchant
merchant.delete('/:_id', exists, controller.deleteById);

export default merchant;
