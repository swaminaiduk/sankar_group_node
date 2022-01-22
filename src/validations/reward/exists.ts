import { Response, NextFunction } from 'express';
import { Reward } from '../../repositories';
import { catchAsync, pick, notFoundResponse } from '../../utils';

export default catchAsync(async (req, res: Response, next: NextFunction): Promise<any> => {
    const id = pick(req.params, ['_id']);
    return await Reward.findById(id).then(async reward => {
        if (reward) {
            req.reward = reward;
            next();
        } else {
            notFoundResponse(res, 'This reward does not exist.');
        }
    });
});