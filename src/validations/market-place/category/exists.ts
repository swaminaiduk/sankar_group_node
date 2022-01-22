import { Response, NextFunction } from 'express';
import { MarketPlaceCategory } from '../../../repositories';
import { catchAsync, notFoundResponse, pick } from '../../../utils';

export default catchAsync(async (req, res: Response, next: NextFunction): Promise<any> => {
    const id = pick(req.params, ['_id']);
    return await MarketPlaceCategory.findById(id).then(async marketPlaceCategory => {
        if (marketPlaceCategory) {
            req.marketPlaceCategory = marketPlaceCategory;
            next();
        } else {
            notFoundResponse(res, 'This category does not exist.');
        }
    });
});