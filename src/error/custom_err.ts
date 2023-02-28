import { StatusCodes } from "http-status-codes";

 class CustomError extends Error {
    public status: number = StatusCodes.INTERNAL_SERVER_ERROR;
    constructor(readonly mes: string = 'Internal server error') {
        super(mes);
        this.message = mes;
    }
}


export default CustomError;