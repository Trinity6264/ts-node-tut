import { Request, Response } from 'express';
import AsyncWrapper from '../helper/async_wrapper';
import UserModel from '../model/user_model';
import { BadRequest } from '../error/bad_request';
import { encryptPassword } from '../helper/encrypt';
import { StatusCodes } from 'http-status-codes';



//  login session
export const loginHandler = (req: Request, res: Response): Response => {
    return res.json({
        'body': req.body.name
    })
}
//  create a new account session
export const signUpHandler: any = AsyncWrapper(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if(!email || !password) throw new BadRequest('Email and Password required')
    const isEmailExist = await UserModel.findOne({ $or: [{ email }] })
    if (isEmailExist) throw new BadRequest('Email already exist')

    const encryptedPass = await encryptPassword(password)

    let user = new UserModel({ email, password: encryptedPass });
    await user.save();
    return res.status(StatusCodes.CREATED).json({
        msg:'User account created successfully'
    })
});