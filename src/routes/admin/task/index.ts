import {Router} from 'express'
import {TaskController} from '../../../controllers/admin'
const task: Router = Router()
const controller = new TaskController
task.get('/',controller.index)
task.post('/newTask',controller.create)
task.get('/comments/:_taskId',controller.getTaskComments)
task.post('/comments',controller.newComment)
task.post('/',controller.updateTask)
export default task;