import { Router } from 'express';
import { ChatController } from "../../controllers/admin";
const chat: Router = Router();
const controller = new ChatController();
chat.get('/:_id', controller.index);
chat.get('/', controller.index);
chat.post('/', controller.create);
chat.get('/media/:group_id',controller.groupMedia)
export default chat;