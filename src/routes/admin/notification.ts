import {Router} from 'express'
import {NotificationController} from '../../controllers/admin'
import { exists } from '../../validations/notification'; 

const notification: Router = Router()
const controller = new NotificationController
notification.get('/', controller.index)
notification.post('/',  controller.create);
notification.delete('/:_id', exists, controller.deleteById);

// get all users
notification.get('/send', controller.users)

export default notification;