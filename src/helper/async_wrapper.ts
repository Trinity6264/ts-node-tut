
import { Request, Response, NextFunction } from 'express'






const AsyncWrapper = (fn: (req: Request, res: Response, next: NextFunction) => void): any => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            fn(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};
export default AsyncWrapper