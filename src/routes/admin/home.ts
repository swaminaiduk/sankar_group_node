import { Router } from 'express';
import HomeController from '../../controllers/admin/HomeController';

const home: Router = Router();

const controller = new HomeController();

// -------------------------------------- Get Routes --------------------------------------

home.get('/', controller.index);

export default home;
