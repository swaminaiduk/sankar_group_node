import { Router } from 'express';
import PointsController from '../../../controllers/admin/PointsController';

const points: Router = Router();

const controller = new PointsController();

// -------------------------------------- Get Routes --------------------------------------

// List of Service with paginate
points.get('/', controller.index);

points.get('/user/:user_id', controller.byUserId);

export default points;
