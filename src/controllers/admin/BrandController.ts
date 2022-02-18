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
        const data = await Brand.create(pick(req.body, ['brand', 'logo']));
        return successResponse(res, 'Brand has been successfully created.', data);
    });
    public updateById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = pick(req.body, ['brand']);
        await Brand.updateById(id, data);
        return successResponse(res, 'Brand data has been successfully updated.', data);
    });
    public deleteById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        await Brand.deleteById(id);
        return successResponse(res, 'Brand has been removed successfully', null);
    });
    public statusChange = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = pick(req.body, ['status']);
        await Brand.updateById(id, data);
        return successResponse(res, 'Brand status has been successfully updated.', data);
    });
    public upload = catchAsync(async (req: Request, res: Response): Promise<any> => {
        if(req?.body?.id)
        await Brand.updateById({id: req?.body?.id}, {logo: req.file.filename});
        return successResponse(res, 'file uploaded successfully', req.file.filename);
    });
    public findById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = await Brand.findById(id);
        return successResponse(res, 'brand data.', data);
    });
}