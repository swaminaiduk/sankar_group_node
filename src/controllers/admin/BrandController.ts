import { Request, Response } from 'express';
import { Brand } from '../../repositories';
import { catchAsync, pick, successResponse } from '../../utils';

export default class BrandController {
    public index = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const filter = pick(req.query, ['brand']);
        const options = pick(req.query, ['limit', 'page']);
        const data = await Brand.query(filter, options);
        return successResponse(res, 'Brand list.', data);
    });
    public names = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const data = await Brand.brandOptions();
        return successResponse(res, 'Brand list.', data);
    });
    public create = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const data = await Brand.create(pick(req.body, ['brand']));
        return successResponse(res, 'Brand has been successfully created.', data);
    });
    public updateById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = pick(req.body, ['name', 'status']);
        await Brand.updateById(id, data);
        return successResponse(res, 'Brand data has been successfully updated.', data);
    });
    public deleteById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        await Brand.deleteById(id);
        return successResponse(res, 'Brand has been removed successfully', null);
    });
}