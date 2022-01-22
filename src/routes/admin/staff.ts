import {Router} from 'express'
import {StaffController} from '../../controllers/admin'
// import { exists } from '../../validations/staff'; 

const staff: Router = Router()
const controller = new StaffController
staff.post('/login', controller.login)
staff.get('/emplist', controller.empList)
staff.get('/', controller.index)
staff.post('/',  controller.create);
staff.get('/dashboard',  controller.dashboard);
staff.delete('/:_id',  controller.deleteById);
staff.post('/company-brand',  controller.companyBrandEmployees);
 
export default staff;