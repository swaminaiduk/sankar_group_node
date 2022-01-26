import { Request, response, Response } from 'express';
import { StaffRepositorie as Staff, Company, Brand, TaskRepositorie as Task, TaskRepositorie } from '../../repositories';
import { catchAsync, pick, successResponse } from './../../utils';
var mongodb = require('mongodb');
export default class StaffController {
    public index =  catchAsync(async (req: Request, res: Response): Promise<any> => {
        const filter = pick(req.query, []);
        const options = pick(req.query, ['limit', 'page']);
        const data = await Staff.query(filter, options);
        
        const responseData: any = await Promise.all(data?.results?.map(async function(row,d){
            var company, brand;
            for(var i = 0; i < 5; i++){
                var tempCompany = await Company.getCompanyName({_id:mongodb.ObjectId(eval(`data?.results[d]?.company${i+1}`))})
                company += (tempCompany !== undefined) ? tempCompany+', ' : ''
                var tempBrand = await Brand.getBrandName({_id:mongodb.ObjectId(eval(`data?.results[d]?.brand${i+1}`))})
                brand += (tempBrand !== undefined) ? tempBrand+', ' : ''
            }
            row.company1 = (company.replace(/undefined/g, ""))
            row.brand1 = (brand.replace(/undefined/g, ""))
            return row
        }))
        return successResponse(res, 'Staff list.', data);
    });
    public companyBrandEmployees = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const data = await Staff.companyBrandEmployees(req.body.company, req.body.brand);
        return successResponse(res, 'Employee list.', data);
    });
    public  login = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const checkLogin = await Staff.checkLogin(req.body.email, req.body.password)
        if(checkLogin){
            return successResponse(res, 'Employee list.',checkLogin);
        }
        else
        return successResponse(res, 'Something went wrong');
    });
    public empList = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const data = await Staff.getAllEmployeeList();
        const newArray = data.map(item => {
            return { value: item._id, label: item.name };
          });
        return successResponse(res, 'Staff list.', newArray);
    });
    public dashboard = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const staff = await Staff.emoployeeCount();
        const brand = await Brand.brandCount();
        const task = await TaskRepositorie.getTasksCount();
        const completedTask = await TaskRepositorie.getCompletedTasksCount();
        const pendingTask = await TaskRepositorie.getPendingTasksCount();
        return successResponse(res, 'Staff list.', {staff: staff, brand: brand, task: task, completedTask: completedTask, pendingTask: pendingTask});
    });
    public findById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = await Staff.findById(id);
        return successResponse(res, 'Staff data.', data);
    });

    public create = catchAsync(async (req: Request, res: Response): Promise<any> => {
        var requestData = req.body
        const data = await Staff.create({
            'name' : requestData.name,  
            'mobile' : requestData.mobile,  
            'role' : requestData.role,
            'status' : true, 
            'company': requestData.company,
            'company1': requestData?.company[0],
            'company2' : requestData?.company[1],
            'company3': requestData?.company[2],
            'company4': requestData?.company[3],
            'company5' : requestData?.company[4], 
            'brand': requestData?.brand,
            'brand1' : requestData?.brand[0], 
            'brand2' : requestData?.brand[1],
            'brand3' : requestData?.brand[2], 
            'brand4' : requestData?.brand[3], 
            'brand5' : requestData?.brand[4],
            'email' : requestData.email,
            'designation': requestData.designation
        });
        return successResponse(res, 'Staff data has been successfully created.', data);
    });
    
    public deleteById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        await Staff.deleteById(id);
        return successResponse(res, 'Staff removed successfully', null);
    });
  
    public updateById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = pick(req.body, ['name', 'mobile', 'mpin', 'role', 'pg', 'department','email']);
        await Staff.updateById(id, data);
        return successResponse(res, 'Staff data has been successfully updated.', data);
    });
       
    public statusChange = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = pick(req.body, ['status']);
        await Staff.updateById(id, data);
        return successResponse(res, 'Staff status has been successfully updated.', data);
    });  
  }