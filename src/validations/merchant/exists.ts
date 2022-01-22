import { Response, NextFunction } from 'express';
import { Merchant } from '../../repositories';
import { catchAsync, pick, notFoundResponse } from '../../utils';

export default catchAsync(async (req, res: Response, next: NextFunction): Promise<any> => {
    const id = pick(req.params, ['_id']);
    return await Merchant.findById(id).then(async mcc => {
        if (mcc) {
            req.mcc = mcc;
            next();
        } else {
            notFoundResponse(res, 'This MCC does not exist.');
        }
    });
});