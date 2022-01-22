import { Router } from 'express';
import { MarketPlaceStoreController } from '../../../../controllers/admin';
import { exists, validation } from '../../../../validations/market-place/category';
import status from '../../../../validations/status';

const store: Router = Router();

const controller = new MarketPlaceStoreController();

// -------------------------------------- Get Routes --------------------------------------

// List of store with paginate
store.get('/', controller.index);

// Dropdown list of store
store.get('/dropdown', controller.dropdown);

// Store details
store.get('/:_id', exists, controller.findById);

// -------------------------------------- Post Routes --------------------------------------

// Create store
store.post('/', controller.create);

// -------------------------------------- Patch Routes --------------------------------------

// Update store
store.patch('/:_id', exists, controller.updateById);
store.patch('/status/change/:_id', exists, status, controller.statusChange);

// -------------------------------------- Delete Routes --------------------------------------

// Delete store
store.delete('/:_id', exists, controller.deleteById);

export default store;
