import { Response, NextFunction } from 'express';
import { MccRepositorie } from '../../repositories';
import { catchAsync, pick, notFoundResponse } from '../../utils';

export default catchAsync(async (req, res: Response, next: NextFunction): Promise<any> => {
    const id = pick(req.params, ['_id']);
    return await MccRepositorie.findById(id).then(async mcc => {
        if (mcc) {
            req.mcc = mcc;
            next();
        } else {
            notFoundResponse(res, 'This MCC does not exist.');
        }
    });
});