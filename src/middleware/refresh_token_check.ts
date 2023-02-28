import { NextFunction, Request, Response } from "express";
import { BadRequest } from "../error/bad_request";
import { JwtPayload, decode } from "jsonwebtoken";


interface userInterface {
    email: string,
    id: string
}

// Checking a new access token if it has expired
export const geneAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;
        console.log(authorization);
        if (!authorization || !authorization.startsWith('Bearer ')) throw new BadRequest('Provide a valid token')

        // splitting the string and taking the token out
        const token = authorization.split(' ')[1]

        // decoding the jsonWebToken to get user data
        const data: string | JwtPayload | null = decode(token);
        if (!data) throw new BadRequest('Token provided is invalid')

        console.log(data);
        next(data);

    } catch (error) {
        next(error)
    }

}