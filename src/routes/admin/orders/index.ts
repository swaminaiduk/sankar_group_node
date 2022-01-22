import {Router} from 'express'
import {WalletController} from '../../../controllers/admin'
const order: Router = Router()
const controller = new OrderController

order.post('/order',controller.order)
export default order;