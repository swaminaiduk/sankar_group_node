import { Request, Response } from 'express';
import { Company } from '../../repositories';
import { catchAsync, pick, successResponse } from '../../utils';

export default class CompanyController {
    public index = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const filter = pick(req.query, ['name']);
        const options = pick(req.query, ['limit', 'page']);
        const data = await Company.query(filter, options);
        return successResponse(res, 'Company list.', data);
    });
    public names = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const data = await Company.companyNames();
        return successResponse(res, 'Company list.', data);
    });

    public findById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = await Company.findById(id);
        return successResponse(res, 'Company data.', data);
    });

    public create = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const data = await Company.create(pick(req.body, ['company', 'city', 'branch', 'logo']));
        return successResponse(res, 'Company created.', data);
    });

    public updateById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = pick(req.body, ['name', 'status']);
        await Company.updateById(id, data);
        return successResponse(res, 'Category data has been successfully updated.', data);
    });

    public deleteById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        await Company.deleteById(id);
        return successResponse(res, 'Category data has been successfully deleted.', null);
    });

    public statusChange = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = pick(req.body, ['status']);
        await Company.updateById(id, data);
        return successResponse(res, 'Company status has been successfully updated.', data);
    });

    public upload = catchAsync(async (req: Request, res: Response): Promise<any> => {
        return successResponse(res, 'file uploaded successfully', req.file.filename);
    });
}