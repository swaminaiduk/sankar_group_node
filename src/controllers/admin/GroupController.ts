import { group } from 'console';
import { Request, Response } from 'express';
import { GroupRepositorie as Group, StaffRepositorie as Staff, Company } from '../../repositories';
import { catchAsync, pick, successResponse } from '../../utils';
var mongodb = require('mongodb');

export default class GiftcardController {
    public index = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const data = await Group.distinctGroups(req.params._emp_id);
        return successResponse(res, 'Group list1.', data);
    }); 
    public groupOptions = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const data = await Group.distinctGroupOptions();
        return successResponse(res, 'Group option list.', data);
    });
    public addNewEmp = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const reqData = req.body
        const data = await Group.create({
            group:reqData.selectedGroup.group,
            company:reqData?.company,
            brand:'brand',
            employee_name:reqData?.item?.label,
            employee_id:reqData?.item?.value,
            group_id: reqData?.selectedGroup?.id
        });
        return successResponse(res, 'staff added.', data);
    });
     
    public groupEmployees = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const data = await Group.getGroupPemployees(req.params.group_id);
        const Assigned = data?.map((s) => {
            return s.value
        })
        const unAssignedStaff = await Staff.getUnGroupPemployees(Assigned);
        return successResponse(res, 'Group Employees list.', [...data, ...unAssignedStaff]);
    }); 
    public removeGroupEmployee = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const data = await Group.deleteGroupPemployees(req.params. _groupId, req.params._staffId);
        return successResponse(res, 'Group Employees list.', data);
    }); 
    
    
    public create = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const reqData = req.body
        var data;
        const group_id = Math.floor(Math.random() * 99999999) + 1
        for(var i=0; i < reqData.assignee.length; i++){
            // get company Name
            const companyName = await Company.getCompanyName({_id:mongodb.ObjectId(reqData.company)})
                data = await Group.create({
                group:reqData.group,
                company:reqData.company,
                company_name:companyName,
                about:reqData.about,
                description:reqData.description,
                brand:reqData.brand,
                employee_name:reqData?.assignee[i]?.label,
                employee_id:reqData?.assignee[i]?.value,
                group_id: group_id,
                logo: reqData?.logo
            });
        }
        if(data)
        return successResponse(res, 'Group created.', data);
        else
        return successResponse(res, 'Group creation failed.', data);
    }); 
}