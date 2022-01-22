import { Response, NextFunction } from 'express';
import { NotificationRepositorie } from '../../repositories';
import { catchAsync, pick, notFoundResponse } from '../../utils';

export default catchAsync(async (req, res: Response, next: NextFunction): Promise<any> => {
    const id = pick(req.params, ['_id']);
    return await NotificationRepositorie.findById(id).then(async user => {
        if (user) {
            req.user = user;
            next();
        } else {
            notFoundResponse(res, 'This Employee does not exist.');
        }
    });
});
 