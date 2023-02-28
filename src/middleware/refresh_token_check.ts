import { NextFunction, Request, Response } from "express";
import { BadRequest } from "../error/bad_request";
import { config } from "dotenv";
import { JwtPayload, verify } from "jsonwebtoken";
config()

interface userInterface {
    readonly email:  string,
    readonly id: string
}

// Checking a new access token if it has expired
export const geneAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;
        if (!authorization || !authorization.startsWith('Bearer ')) throw new BadRequest('Provide a valid token')

        // splitting the string and taking the token out
        const token = authorization.split(' ')[1]

        // decoding the jsonWebToken to get user data
        const data: string | JwtPayload | null = verify(token, process.env.ACCESS_JWT_SECRET!);
        if (!data) throw new BadRequest('Token provided is invalid')

        console.log(data);
        //? req!.user! = data
        next();

    } catch (error) {
        console.log(error);
        next(error)
    }

}