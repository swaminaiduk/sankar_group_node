import {Router} from 'express'
import {MediaController} from '../../../controllers/admin'
import image from './image';

const media: Router = Router()
const controller = new MediaController
export default media;
 