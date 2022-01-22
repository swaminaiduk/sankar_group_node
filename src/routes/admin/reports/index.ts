import { Router } from 'express';
import ReportController from '../../../controllers/admin/ReportController';

const reports: Router = Router();

const controller = new ReportController();

// -------------------------------------- Get Routes --------------------------------------

// List of Service with paginate
reports.get('/', controller.index);

reports.delete('/:_id', controller.deleteById);

export default reports;
