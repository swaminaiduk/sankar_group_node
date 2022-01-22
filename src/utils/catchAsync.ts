import * as httpStatus from 'http-status';
import { validationResult } from "express-validator";

const catchAsync = (fn) => (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const status = httpStatus.UNPROCESSABLE_ENTITY;
        return res.status(status).json({
            success: true,
            status: status,
            message: "Validation error.",
            errors: errors.array()
        });
    }
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

export default catchAsync;