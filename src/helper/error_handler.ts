import { Request, Response, NextFunction } from 'express'

import CustomError from '../error/custom_err';


import { StatusCodes } from "http-status-codes";

const errorHandler = (err: ErrorCallback, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        return res.status(err.status).json({
            status: false,
            msg: err.message,
            data: {},
        });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: false,
        msg: 'Internal server error',
        data: {},
    });
};

export default errorHandler;