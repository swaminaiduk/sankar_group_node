import { group } from 'console';
import { Request, Response } from 'express';
import { GroupRepositorie as Group } from '../../repositories';
import { catchAsync, pick, successResponse } from '../../utils';

export default class GiftcardController {
    public index = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const data = await Group.distinctGroups();
        return successResponse(res, 'Group list.', data);
    }); 
    public groupOptions = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const data = await Group.distinctGroupOptions();
        return successResponse(res, 'Group option list.', data);
    }); 
    public groupEmployees = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const data = await Group.getGroupPemployees(req.params.group_id);
        return successResponse(res, 'Group Employees list.', data);
    }); 
    
    public create = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const reqData = req.body
        var data;
        const group_id = Math.floor(Math.random() * 99999999) + 1
        for(var i=0; i < reqData.assignee.length; i++){
            data = await Group.create({
                group:reqData.group,
                company:reqData.company,
                brand:reqData.brand,
                employee_name:reqData?.assignee[i]?.label,
                employee_id:reqData?.assignee[i]?.value,
                group_id: group_id
            });
        }
        return successResponse(res, 'Group created.', data);
    }); 
}