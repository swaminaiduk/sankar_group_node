import { Response, NextFunction } from 'express';
import { Service } from '../../repositories';
import { catchAsync, pick, notFoundResponse } from '../../utils';

export default catchAsync(async (req, res: Response, next: NextFunction): Promise<any> => {
    const id = pick(req.params, ['_id']);
    return await Service.findById(id).then(async service => {
        if (service) {
            req.service = service;
            next();
        } else {
            notFoundResponse(res, 'This reward does not exist.');
        }
    });
});