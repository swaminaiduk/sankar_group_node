import { Request, Response } from 'express';
import { BanerType } from '../../repositories';
import { catchAsync, pick, successResponse } from './../../utils';
import config from '../../config/app'

export default class BanerTypeController {
    public index = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const filter = pick(req.query, []);
        const options = pick(req.query, ['limit', 'page']);
        const data = await BanerType.query(filter, options);
        return successResponse(res, 'BanerType list.', { ...data, image_path: `${config.BASE_URL}/${config.IMAGE_PATH}/` });
    });

    public findById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = await BanerType.findById(id);
        return successResponse(res, 'BanerType data.', data);
    });

    public create = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const data = await BanerType.create(pick(req.body, ['position', 'status']));
        return successResponse(res, 'BanerType data has been successfully created.', data);
    });

    public updateById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = pick(req.body, ['position', 'status']);
        await BanerType.updateById(id, data);
        return successResponse(res, 'BanerType data has been successfully updated.', data);
    });

    public updateImageById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = pick(req.body, ['images']);
        await BanerType.updateById(id, data);
        return successResponse(res, 'BanerType data has been successfully updated.', data);
    });

    public statusChange = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = pick(req.body, ['status']);
        await BanerType.updateById(id, data);
        return successResponse(res, 'BanerType status has been successfully updated.', data);
    });

    public deleteById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        await BanerType.deleteById(id);
        return successResponse(res, 'BanerType data has been successfully deleted.', null);
    });
}