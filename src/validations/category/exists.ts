import { Response, NextFunction } from 'express';
import { Company } from '../../repositories';
import { catchAsync, notFoundResponse, pick } from '../../utils';

export default catchAsync(async (req, res: Response, next: NextFunction): Promise<any> => {
    const id = pick(req.params, ['_id']);
    return await Company.findById(id).then(async category => {
        if (category) {
            req.category = category;
            next();
        } else {
            notFoundResponse(res, 'This category does not exist.');
        }
    });
});