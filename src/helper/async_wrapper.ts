
import { Request, Response, NextFunction } from 'express'
import { UserRequest } from '../middleware/auth_check';







const AsyncWrapper = (fn: (req: UserRequest, res: Response, next: NextFunction) => void): any => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
           await fn(req as UserRequest, res, next);
        } catch (error) {
            console.log(error);
            
            next(error);
        }
    };
};
export default AsyncWrapper