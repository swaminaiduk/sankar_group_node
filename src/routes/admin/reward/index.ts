import { Router } from 'express';
import { RewardController } from '../../../controllers/admin';
import { exists, validation } from '../../../validations/reward';
import status from '../../../validations/status';

const reward: Router = Router();

const controller = new RewardController();

// -------------------------------------- Get Routes --------------------------------------

// List of reward with paginate
reward.get('/', controller.index);

// Reward details
reward.get('/:_id', exists, controller.findById);

// -------------------------------------- Post Routes --------------------------------------

// Create reward
reward.post('/', validation, controller.create);

// -------------------------------------- Patch Routes --------------------------------------

// Update reward
reward.patch('/:_id', exists, validation, controller.updateById);
reward.patch('/status/change/:_id', exists, status, controller.statusChange);

// -------------------------------------- Delete Routes --------------------------------------

// Delete reward
reward.delete('/:_id', exists, controller.deleteById);

export default reward;
