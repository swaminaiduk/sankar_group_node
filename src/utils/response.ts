import * as httpStatus from 'http-status';
import { Response } from 'express';

export const successResponse = (res: Response, message = "", data = null) => {
    const status = httpStatus.OK;
    res.status(status).json({
        success: true,
        status: status,
        message: message,
        data: data
    });
    res.end();
}

export const notFoundResponse = (res: Response, message = "") => {
    const status = httpStatus.NOT_FOUND;
    res.status(status).json({
        success: false,
        status: status,
        message: message,
        data: null
    });
    res.end();
}