import { Request, Response } from 'express';
import { Merchant } from '../../repositories';
import { catchAsync, pick, successResponse } from './../../utils';
import config from '../../config/app'

export default class MerchantController {
    public index = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const filter = pick(req.query, ['merchant_id', 'verified', 'status']);
        const options = pick(req.query, ['limit', 'page']);
        const data = await Merchant.query(filter, { ...options, populate: { path: 'mcc', select: ['code'], populate: { path: 'type', select: ['name', 'brand', 'product', 'points', 'points_type'] } } });
        return successResponse(res, 'Merchant list.', { ...data, image_path: `${config.BASE_URL}/${config.IMAGE_PATH}/` });
    });

    public findById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = await Merchant.findById(id);
        return successResponse(res, 'Merchant data.', data);
    });

    public create = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const data = await Merchant.create(pick(req.body, ['icon', 'merchant_id', 'terminal_id', 'merchant_name', 'location', 'mcc', 'status']));
        return successResponse(res, 'Merchant data has been successfully created.', data);
    });

    public updateById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = pick(req.body, ['icon', 'merchant_id', 'terminal_id', 'merchant_name', 'location', 'mcc', 'status']);
        await Merchant.updateById(id, data);
        return successResponse(res, 'Merchant data has been successfully updated.', data);
    });

    public deleteById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        await Merchant.deleteById(id);
        return successResponse(res, 'Merchant data has been successfully deleted.', null);
    });

    public verifiedChange = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = pick(req.body, ['verified']);
        await Merchant.updateById(id, data);
        return successResponse(res, 'Merchant verified has been successfully updated.', data);
    });

    public statusChange = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = pick(req.body, ['status']);
        await Merchant.updateById(id, data);
        return successResponse(res, 'Merchant status has been successfully updated.', data);
    });
}