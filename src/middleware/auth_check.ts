import { NextFunction, Request, Response } from "express";
import { BadRequest } from "../error/bad_request";
import { config } from "dotenv";
import { StatusCodes } from "http-status-codes";
import { JwtPayload, verify, JsonWebTokenError } from "jsonwebtoken";
config()


export interface UserRequest extends Request {
    userData: string | JwtPayload,
}

// Checking a new access token if it has expired
export const authCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;
        if (!authorization || !authorization.startsWith('Bearer ')) throw new BadRequest('Provide a valid token')

        // splitting the string and taking the token out
        const token = authorization.split(' ')[1]

        // decoding the jsonWebToken to get user data
        const data: string | JwtPayload | null = verify(token, process.env.ACCESS_JWT_SECRET!);
        if (!data) throw new BadRequest('Token provided is invalid')

        console.log(data);

        res.locals = {
            data
        }
        next();

    }

    catch (error) {
        if (error instanceof JsonWebTokenError) {
            return res.status(StatusCodes.FORBIDDEN).json({
                status: false,
                msg: error.message,
                data: {},
            });
        }
        next(error)
    }

}