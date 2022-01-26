import {Router} from 'express'
import {GroupController} from '../../../controllers/admin'
const group: Router = Router()
const controller = new GroupController
group.get('/groupOptions',controller.groupOptions)
group.get('/:_emp_id',controller.index)
group.post('/addStaff',controller.addNewEmp)
group.post('/',controller.create)
group.get('/groupEmployees/:group_id',controller.groupEmployees)
group.delete('/:_groupId/:_staffId',controller.removeGroupEmployee)
export default group;