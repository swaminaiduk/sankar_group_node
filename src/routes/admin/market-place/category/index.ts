import { Router } from 'express';
import { MarketPlaceCategoryController } from '../../../../controllers/admin';
import { exists, validation } from '../../../../validations/market-place/category';
import status from '../../../../validations/status';

const category: Router = Router();

const controller = new MarketPlaceCategoryController();

// -------------------------------------- Get Routes --------------------------------------

// List of category with paginate
category.get('/', controller.index);

// Dropdown list of category
category.get('/dropdown', controller.dropdown);

// Category details
category.get('/:_id', exists, controller.findById);

// -------------------------------------- Post Routes --------------------------------------

// Create category
category.post('/', validation, controller.create);

// -------------------------------------- Patch Routes --------------------------------------

// Update category
category.patch('/:_id', exists, validation, controller.updateById);
category.patch('/status/change/:_id', exists, status, controller.statusChange);

// -------------------------------------- Delete Routes --------------------------------------

// Delete category
category.delete('/:_id', exists, controller.deleteById);

export default category;
