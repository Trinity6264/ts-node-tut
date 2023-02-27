import { Request, Response } from 'express';


export const loginHandler = (req: Request, res: Response): Response => {
    return res.json({
       'body':req.body
    })
}

