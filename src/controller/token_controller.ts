import tokenModel from '../model/token_model'
const jwt = require("jsonwebtoken");
import AsyncWrapper from "../helper/async_wrapper";
import { UnAuthenticated } from '../error/unauthenticated_err';
import { config } from 'dotenv'
import { BadRequest } from '../error/bad_request';
config();

const refreshToken = AsyncWrapper(async (req, res) => {
    const { token } = req.body;
    if (!token) {
        throw new UnAuthenticated("RefreshToken is required");
    }

    const data = await tokenModel.findOne({ $or: [{ token }] });
    if (data === null) throw new BadRequest("Token not found");
    const tokenExpire = jwt.verify(token, process.env.REFRESH_TOKEN_KEY!);
    if (!tokenExpire) throw new UnAuthenticated("Refresh token expired");
    const decodeToken = jwt.decode(token);
    const { id } = decodeToken;
    await tokenModel.findOneAndDelete({ $or: [{ created_by: id }] });
    const accessToken = jwt.sign({ id }, process.env.ACCESS_JWT_SECRET, {
        expiresIn: "30mins",
    });
    const refreshToken = jwt.sign({ id }, process.env.REFRESH_JWT_SECRET, {
        expiresIn: "30d",
    });
    await new tokenModel({created_by: id, token: refreshToken}).save();
    return res.status(201).json({
        status: true,
        msg: "Token refresh successfully",
        data: { accessToken, refreshToken },
    });
});

module.exports = refreshToken;