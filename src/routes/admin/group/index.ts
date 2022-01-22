import {Router} from 'express'
import {GroupController} from '../../../controllers/admin'
const group: Router = Router()
const controller = new GroupController
group.get('/',controller.index)
group.post('/',controller.create)
group.get('/groupOptions',controller.groupOptions)
group.get('/groupEmployees/:group_id',controller.groupEmployees)
export default group;