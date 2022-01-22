import { Router } from 'express';
import category from './category';
import store from './store';

const marketPlace: Router = Router();

marketPlace.use('/category', category);
marketPlace.use('/store', store);

export default marketPlace;
