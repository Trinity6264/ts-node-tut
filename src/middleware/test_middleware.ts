import { Response, Request, NextFunction } from 'express'


const testingMiddleware = () => (req: Request, res: Response, next: NextFunction) => {
    console.log('Just for testing');
    return next()
}

export default testingMiddleware