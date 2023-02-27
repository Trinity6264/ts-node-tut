import { Request, Response, NextFunction } from 'express';
import AsyncWrapper from '../helper/async_wrapper';
import CustomError from '../error/custom_err';


export const loginHandler = (req: Request, res: Response): Response => {
    return res.json({
        'body': req.body.name
    })
}

export const signUpHandler: any = AsyncWrapper((req: Request, res: Response) => {
    throw new CustomError('An exception was found')
});