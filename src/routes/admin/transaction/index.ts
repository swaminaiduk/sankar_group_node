import { Router } from 'express';
import TransactionController from '../../../controllers/admin/TransactionController';
const transaction: Router = Router();
const controller = new TransactionController();
transaction.get('/', controller.index);
transaction.get('/wallet/cust_id/:cust_id', controller.customerTransactions);
transaction.post('/update', controller.update);

export default transaction;
