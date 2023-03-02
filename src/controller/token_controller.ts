import tokenModel from '../model/token_model'

import AsyncWrapper from "../helper/async_wrapper";
import { UnAuthenticated } from '../error/unauthenticated_err';
import { config } from 'dotenv'
import { BadRequest } from '../error/bad_request';
import jsWebToken, { JwtPayload, verify } from 'jsonwebtoken';
import { responseObj } from './user_controller';
config();




// generate new access and refresh token using the token rotation service
export const refreshToken = AsyncWrapper(async (req, res) => {
    const { token } = req.body;
    if (!token) {
        throw new UnAuthenticated("RefreshToken is required");
    }

    const data: any = await tokenModel.findOne({ $or: [{ token }] });
    if (data === null) throw new BadRequest("Token not found");
    const tokenExpire: string | JwtPayload | null = verify(token, process.env.REFRESH_JWT_SECRET!);
    if (!tokenExpire) throw new UnAuthenticated("Refresh token expired");

    await tokenModel.findOneAndDelete({ $or: [{ token }] });
    const resp: responseObj = { id: data['created_by'] }
    const access_token: any = jsWebToken.sign(resp, process.env.ACCESS_JWT_SECRET!, {
        expiresIn: '30m'
    })
    const refresh_token: string = jsWebToken.sign(resp, process.env.REFRESH_JWT_SECRET!, {
        expiresIn: '30 days'
    })
    await new tokenModel({ created_by:  data['created_by'], token: refresh_token }).save();
    return res.status(201).json({
        status: true,
        msg: "Token refresh successfully",
        data: { access_token, refresh_token },
    });
});
