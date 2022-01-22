import { Router } from 'express';
import YesBankCardController from '../../../controllers/admin/YesBankCardController';

const yesBankCard: Router = Router();

const controller = new YesBankCardController();

// -------------------------------------- Get Routes --------------------------------------

// List of Service with paginate
yesBankCard.get('/', controller.index);

export default yesBankCard;
