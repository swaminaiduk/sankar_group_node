import { Request, Response } from 'express';
import { Reward } from '../../repositories';
import { catchAsync, generateUniqueNumber, pick, successResponse } from './../../utils';

export default class RewardController {
    public index = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const filter = pick(req.query, ['reward_id']);
        const options = pick(req.query, ['limit', 'page']);
        const data = await Reward.query(filter, options);
        return successResponse(res, 'Reward list.', data);
    });

    public findById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = await Reward.findById(id);
        return successResponse(res, 'Reward data.', data);
    });

    public create = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const reward_id = await Reward.generateUniqueRewardId();
        const data = await Reward.create({ reward_id: reward_id.toString(), ...pick(req.body, ['reward_type', 'point', 'point_type', 'status']) });
        return successResponse(res, 'Reward data has been successfully created.', data);
    });

    public updateById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = pick(req.body, ['reward_type', 'point', 'point_type', 'status']);
        await Reward.updateById(id, data);
        return successResponse(res, 'Reward data has been successfully updated.', data);
    });

    public deleteById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        await Reward.deleteById(id);
        return successResponse(res, 'Reward data has been successfully deleted.', null);
    });

    public statusChange = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = pick(req.body, ['status']);
        await Reward.updateById(id, data);
        return successResponse(res, 'Reward status has been successfully updated.', data);
    });
}