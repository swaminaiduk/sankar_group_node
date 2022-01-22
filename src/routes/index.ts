import admin from './admin';
import { Router } from 'express';

const router: Router = Router();

router.use('/admin', admin);

export default router;
