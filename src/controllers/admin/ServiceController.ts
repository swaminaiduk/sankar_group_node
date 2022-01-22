import { Request, Response } from 'express';
import { Service } from '../../repositories';
import { catchAsync, pick, successResponse } from './../../utils';
import config from '../../config/app'

export default class ServiceController {
    public index = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const filter = pick(req.query, []);
        const options = pick(req.query, ['limit', 'page']);
        const data = await Service.query(filter, options);
        return successResponse(res, 'Service list.', { ...data});
    });
    public dropdown = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const service = await Service.dropdown();
        return successResponse(res, 'Service list for dropdown.', service);
    });
    public findById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = await Service.findById(id);
        return successResponse(res, 'Service data.', data);
    });

    public create = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const data = await Service.create(pick(req.body, ['name', 'username', 'password', 'key', 'salt', 'token','status']));
        return successResponse(res, 'Service pg has been successfully created.', data);
    });

    public updateById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = pick(req.body, [ 'name', 'username', 'password', 'key', 'salt', 'token','status']);
        await Service.updateById(id, data);
        return successResponse(res, 'Service data has been successfully updated.', data);
    });

    public deleteById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        await Service.deleteById(id);
        return successResponse(res, 'Service data has been successfully deleted.', null);
    });

    public statusChange = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = pick(req.body, ['status']);
        await Service.updateById(id, data);
        return successResponse(res, 'Service status has been successfully updated.', data);
    }); 
}