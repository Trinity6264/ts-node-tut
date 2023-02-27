import { Request, Response, NextFunction } from 'express'

import CustomError from '../error/custom_err';


// const { StatusCodes } = require("http-status-codes");

const errorHandler = (err: ErrorCallback, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        return res.status(err.status).json({
            status: false,
            msg: err.message,
            data: {},
        });
    }
    return res.status(500).json({
        status: false,
        msg: 'Server down',
        data: {},
    });
};

export default errorHandler;