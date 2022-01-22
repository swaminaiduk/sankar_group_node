import { Request, Response } from 'express';
import { MarketPlaceCategory } from '../../../repositories';
import { catchAsync, pick, successResponse } from '../../../utils';

export default class CategoryController {
    public index = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const filter = pick(req.query, ['title']);
        const options = pick(req.query, ['limit', 'page']);
        const data = await MarketPlaceCategory.query(filter, options);
        return successResponse(res, 'Category list.', data);
    });

    public findById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = await MarketPlaceCategory.findById(id);
        return successResponse(res, 'Category data.', data);
    });

    public create = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const category_id = await MarketPlaceCategory.generateUniqueCategoryId();
        const data = await MarketPlaceCategory.create({ category_id: category_id.toString(), ...pick(req.body, ['title', 'parent_category', 'status']) });
        return successResponse(res, 'Category data has been successfully created.', data);
    });

    public updateById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = pick(req.body, ['title', 'parent_category', 'status']);
        await MarketPlaceCategory.updateById(id, data);
        return successResponse(res, 'Category data has been successfully updated.', data);
    });

    public deleteById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        await MarketPlaceCategory.deleteById(id);
        return successResponse(res, 'Category data has been successfully deleted.', null);
    });

    public dropdown = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const categories = await MarketPlaceCategory.dropdown();
        return successResponse(res, 'Category list for dropdown.', [{ value: "Main", label: "Main" }, ...categories]);
    });

    public statusChange = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = pick(req.body, ['status']);
        await MarketPlaceCategory.updateById(id, data);
        return successResponse(res, 'Category status has been successfully updated.', data);
    });
}