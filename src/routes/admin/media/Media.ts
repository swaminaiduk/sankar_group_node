import {Router} from 'express'
import {MediaController} from '../../../controllers/admin'
import image from './image';

const media: Router = Router()
const controller = new MediaController
// media.use('/',  controller.create);

export default media;
 