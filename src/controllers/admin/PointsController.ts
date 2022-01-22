import { Request, Response } from 'express';
import { catchAsync, pick, successResponse } from './../../utils';
import PointsRepositorie from '../../repositories/PointsRepositorie';
import { User } from "../../models/user";
import * as mongoose from 'mongoose';
import Points from '../../models/Points';
import * as fs from 'fs';
import * as fastCsv from 'fast-csv';
import Reports from '../../models/Reports';
import * as moment from "moment";
import { Service } from '../../models/service';

export default class PointsController {
    public index = catchAsync(async (req: Request, res: Response): Promise<any> => {
        let filter = pick(req.query, []);
        const { start, end } = pick(req.query, ['start', 'end']);
        if (start !== undefined && end !== undefined) {
            filter['createdAt'] = {
                $gte: start,
                $lte: end
            };
        }
        const options = pick(req.query, ['limit', 'page']);
        const { phone_number } = pick(req.query, ['phone_number'])
        const user = await User.findOne({ phone_number: phone_number });
        if (user?.id) {
            filter['user_id'] = mongoose.Types.ObjectId(user?.id);
        }
        const { type } = pick(req.query, ['type']);
        if (type !== undefined) {
            const services: any = await Service.find({ brand: { $in: [type] } }).select('_id');
            filter['service_id'] = { $in: services };
        }
        const points = await PointsRepositorie.query(filter, { ...options, populate: [{ path: 'user_id', select: ['phone_number'] }, { path: 'transaction_id', select: ['details'], populate: { path: 'service_id', select: ['name', 'brand', 'product'] } }] });
        const { csv } = pick(req.query, ['csv']);
        if (csv === 'true') {
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.csv`;
            if (start !== undefined && end !== undefined) {
                await Reports.create({
                    file_name: fileName,
                    type: 'point',
                    start_date: start,
                    end_date: end
                });
            } else {
                await Reports.create({
                    file_name: fileName,
                    type: 'point',
                });
            }
            const ws = fs.createWriteStream(`public/reports/${fileName}`);
            let data = [];
            data.push({
                points_id: "POINTS ID",
                transaction_id: "TRANSACTION ID",
                phone_number: "Phone Number",
                earn_points: "EARN POINTS",
                current_points: "CURRENT POINTS",
                time: "Date and Time"
            });
            const pointsData: any = await Points.find(filter)
                .sort('-created_at')
                .populate({ path: 'user_id', select: ['phone_number'] })
                .select(['_id', 'transaction_id', 'earn_points', 'current_points', 'created_at']);
            pointsData.forEach(point => {
                data.push({
                    points_id: point?._id,
                    transaction_id: point?.transaction_id,
                    phone_number: point.user_id?.phone_number,
                    earn_points: point?.earn_points,
                    current_points: point?.current_points,
                    time: moment(point.createdAt).utcOffset("+05:30").format("DD/MM/YYYY hh:mm A")
                });
            });
            fastCsv.write(data).pipe(ws);
        }
        const results = await points.results.map((point) => {
            return {
                points_id: point?.id,
                earn_points: point?.earn_points,
                current_points: point?.current_points,
                previous_points: point?.previous_points,
                transaction_id: point?.transaction_id,
                createdAt: point?.createdAt,
                phone_number: point.user_id?.phone_number,
                time: point.createdAt,
            }
        });
        return successResponse(res, 'Points list.', { ...points, results: await results });
    });

    public byUserId = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const { user_id } = pick(req.params, ['user_id']);
        const data = await Points.find({ user_id: user_id }).select(['earn_points', 'current_points', 'previous_points', 'createdAt']).populate({ path: 'transaction_id', select: ['details'], populate: { path: 'service_id', select: ['name', 'brand', 'product'] } }).sort('-createdAt');
        return successResponse(res, 'Points data has been successfully created.', data);
    });
}