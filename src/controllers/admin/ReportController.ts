import { Request, Response } from 'express';
import { catchAsync, pick, successResponse } from './../../utils';
import ReportsRepositorie from '../../repositories/ReportsRepositorie';
import config from '../../config/app'
import * as fs from 'fs';

export default class ReportsController {
    public index = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const { start, end } = pick(req.query, ['start', 'end']);
        const { type } = pick(req.query, ['type']);
        let filter = {};
        if (start !== undefined && end !== undefined) {
            filter = {
                createdAt: {
                    $gte: start,
                    $lte: end
                }
            };
        }
        if (type !== undefined) {
            filter['type'] = type;
        }
        const reports: any = await ReportsRepositorie.query(filter, {});
        const filesize = require("filesize");
        return successResponse(res, 'Home page.', {
            ...reports, results: reports.results.map(report => {
                const stats = fs.statSync(`public/reports/${report.file_name}`)
                return { ...report.toJSON(), size: filesize(stats.size) };
            }), base_url: config.BASE_URL
        });
    });

    public deleteById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data: any = await ReportsRepositorie.findById(id);
        await ReportsRepositorie.deleteById(id);
        try {
            fs.unlinkSync(`public/reports/${data.file_name}`);
        } catch (error) { }
        return successResponse(res, 'Reward data has been successfully deleted.', {});
    });
}