import CustomError from "./custom_err";
import { StatusCodes } from 'http-status-codes';

export class UnAuthenticated extends CustomError {
    constructor(public readonly message: string) {
        super(message);
        this.status = StatusCodes.UNAUTHORIZED
    }
}