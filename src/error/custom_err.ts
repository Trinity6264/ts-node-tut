// const { StatusCodes } = require("http-status-codes");

class CustomError extends Error {
    public status: number = 500;
    constructor(readonly mes: string) {
        super(mes);
        this.message = mes;
    }
}


export default CustomError;