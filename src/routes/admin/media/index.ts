import { Router } from 'express';
import image from './image';
import { MediaController } from '../../../controllers/admin';
const media: Router = Router();
media.use('/upload', image);
export default media;
