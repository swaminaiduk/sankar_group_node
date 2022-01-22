import * as httpStatus from 'http-status';
import { notFoundResponse } from '../utils';

// handle not found errors
export const notFound = (req, res, next) => {
  notFoundResponse(res, 'Requested Resource Not Found.');
};

// handle internal server errors
export const internalServerError = (err, req, res, next) => {
  const status = err.status || httpStatus.INTERNAL_SERVER_ERROR;
  res.status(status).json({
    success: false,
    status: status,
    message: err.message,
    extra: err.extra,
    errors: err
  });
  res.end();
};
