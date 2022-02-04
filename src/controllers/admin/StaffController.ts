import { Request, response, Response } from 'express';
// import { Group } from '../../models/group';
import { StaffRepositorie as Staff, Company, Brand, TaskRepositorie as Task, TaskRepositorie, GroupRepositorie as Group } from '../../repositories';
import { catchAsync, pick, successResponse } from './../../utils';
var mongodb = require('mongodb');
const nodemailer = require("nodemailer");
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
    public upload = catchAsync(async (req: Request, res: Response): Promise<any> => {
        return successResponse(res, 'file uploaded successfully', req.file.filename);
    });
    public empList = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const data = await Staff.getAllEmployeeList();
        const newArray = data.map(item => {
            return { value: item._id, label: item.name };
          });
        return successResponse(res, 'Staff list.', newArray);
    });
    public dashboard = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const companyCnt = await Company.getCount();
        const brand = await Brand.brandCount();
        const staff = await Staff.emoployeeCount();
        const groupCnt = await Group.getCount();
        const task = await TaskRepositorie.getTasksCount();
        const completedTask = await TaskRepositorie.getCompletedTasksCount();
        const pendingTask = await TaskRepositorie.getPendingTasksCount();
        console.log(groupCnt)
        
        return successResponse(res, 'Staff list.', {companyCnt: companyCnt, staff: staff, brand: brand, task: task, groupCnt: groupCnt, completedTask: completedTask, pendingTask: pendingTask});
    });
    public findById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = await Staff.findById(id);
        return successResponse(res, 'Staff data.', data);
    });

    public create = catchAsync(async (req: Request, res: Response): Promise<any> => {
        var requestData = req.body
        const password = Math.floor(1000 + Math.random() * 9000)
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
            'personal_email' : requestData.personal_email,
            'personal_mobile' : requestData.personal_mobile,
            'designation': requestData.designation,
            'logo': requestData.logo,
            'password': password,
            'mpin': password
        });
        if(data){
            // send mail 
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: testAccount.user, // generated ethereal user
              pass: testAccount.pass, // generated ethereal password
            },
          });
          let info = await transporter.sendMail({
            from: '"Sankar Groups" <digipefintech@gmail.com>', // sender address
            to: requestData.email, // list of receivers
            subject: "Welcome to Sankar Groups", // Subject line
            text: "Sankar groups", // plain text body
            html: "<b>Hello "+requestData?.name+"</b><br/><br/> Sankar Groups login Password is: "+password, 
          });
          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
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