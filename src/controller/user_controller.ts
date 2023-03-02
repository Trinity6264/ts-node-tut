import { Request, Response } from 'express';
import AsyncWrapper from '../helper/async_wrapper';
import UserModel from '../model/user_model';
import { BadRequest } from '../error/bad_request';
import { encryptPassword } from '../helper/encrypt';
import { StatusCodes } from 'http-status-codes';
import jsWebToken from 'jsonwebtoken'
import { config } from 'dotenv'
import TokenModel from '../model/token_model';

// load dotenv files
config()


export interface responseObj {
    [index: string]: number | string
}

//  login session
export const loginHandler = AsyncWrapper(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) throw new BadRequest('Email and Password required')
    const isEmailExist = await UserModel.findOne({ $or: [{ email }] })
    if (!isEmailExist) throw new BadRequest('Invalid account')

    const resp: responseObj = { id: isEmailExist['id'] }

    // sign in with jsonwebtoken
    const access_token: string = jsWebToken.sign(resp, process.env.ACCESS_JWT_SECRET!, {
        expiresIn: '30m'
    })
    const refresh_token: string = jsWebToken.sign(resp, process.env.REFRESH_JWT_SECRET!, {
        expiresIn: '30 days'
    })
    await new TokenModel({ created_by: isEmailExist['id'], token: refresh_token }).save();
    return res.status(StatusCodes.CREATED).json({
        msg: 'User login successfully',
        data: { access_token, refresh_token }
    })
})


//  create a new account session
export const signUpHandler: any = AsyncWrapper(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) throw new BadRequest('Email and Password required')
    const isEmailExist = await UserModel.findOne({ $or: [{ email }] })
    if (isEmailExist) throw new BadRequest('Email already exist')

    const encryptedPass = await encryptPassword(password)

    let user = new UserModel({ email, password: encryptedPass });
    await user.save();
    return res.status(StatusCodes.ACCEPTED).json({
        msg: 'User account created successfully',
        data: {}
    })
});