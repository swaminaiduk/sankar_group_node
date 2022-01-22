import { Response, NextFunction } from 'express';
import BanerType from '../../models/BanerType';
import { catchAsync, pick, notFoundResponse } from '../../utils';

export default catchAsync(async (req, res: Response, next: NextFunction): Promise<any> => {
    const id = pick(req.params, ['_id']);
    return await BanerType.findById(id).then(async banerType => {
        if (banerType) {
            req.banerType = banerType;
            next();
        } else {
            notFoundResponse(res, 'This baner type does not exist.');
        }
    });
});