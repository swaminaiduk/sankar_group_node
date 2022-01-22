import { Request, Response } from 'express';
import { catchAsync, pick, successResponse } from './../../utils';
import YesBankCustomer from '../../models/YesBankCustomer';
import { User } from '../../models';
import Transaction from "../../models/task";
import { Service } from '../../models/service';

export default class HomeController {
    public index = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const { start, end } = pick(req.query, ['start', 'end']);
        let filter = {};
        if (start !== undefined && end !== undefined) {
            filter['created_at'] = {
                $gte: start,
                $lte: end
            };
        }
        const user_count = await User.countDocuments({ ...filter });
        const kyc_user_count = await YesBankCustomer.countDocuments({ kyc_type: { $ne: null }, ...filter });
        if (start !== undefined && end !== undefined) {
            filter = {
                createdAt: {
                    $gte: start,
                    $lte: end
                }
            };
        }
        const services: any = await Service.find({ brand: { $in: ['Card'] } }).select('_id');
        const transaction = await Transaction.find({
            code: "01",
            ...filter,
            service_id: { $in: services }
        }).select('amount')
        const transaction_count = transaction.reduce((total, obj: any) => parseFloat(obj.amount) + total, 0);
        const ecollect_services: any = await Service.find({ name: { $in: ['Yes Bank Ecollect'] } }).select('_id');
        const ecollect_transaction = await Transaction.find({
            code: "01",
            ...filter,
            service_id: { $in: ecollect_services }
        }).select('amount')
        const ecollect_count = ecollect_transaction.reduce((total, obj: any) => parseFloat(obj.amount) + total, 0);
        return successResponse(res, 'Home page.', { user_count, kyc_user_count, transaction_count, ecollect_count });
    });
}