import { Request, Response } from 'express';
import { MarketPlaceStore } from '../../../repositories';
import { catchAsync, pick, successResponse } from '../../../utils';

export default class StoreController {
    public index = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const filter = pick(req.query, []);
        const options = pick(req.query, ['limit', 'page']);
        const data = await MarketPlaceStore.query(filter, options);
        return successResponse(res, 'Store list.', data);
    });

    public findById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = await MarketPlaceStore.findById(id);
        return successResponse(res, 'Store data.', data);
    });

    public create = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const store_id = await MarketPlaceStore.generateUniqueStoreId();
        const data = await MarketPlaceStore.create({ category_id: store_id.toString(), store_id, ...pick(req.body, ['store_type', 'icon', 'logo', 'store_name', 'sub_title', 'offer', 'category', 'sub_category', 'status', 'availOffer']) });
        return successResponse(res, 'Store data has been successfully created.', data);
    });

    public updateById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = pick(req.body, ['store_type', 'icon', 'logo', 'store_id', 'store_name', 'sub_title', 'offer', 'category', 'sub_category', 'status']);
        await MarketPlaceStore.updateById(id, data);
        return successResponse(res, 'Store data has been successfully updated.', data);
    });

    public deleteById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        await MarketPlaceStore.deleteById(id);
        return successResponse(res, 'Store data has been successfully deleted.', null);
    });

    public dropdown = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const stores = await MarketPlaceStore.dropdown();
        return successResponse(res, 'Store list for dropdown.', stores);
    });

    public statusChange = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = pick(req.body, ['status']);
        await MarketPlaceStore.updateById(id, data);
        return successResponse(res, 'Store status has been successfully updated.', data);
    });
}