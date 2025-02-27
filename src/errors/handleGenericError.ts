/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { TDetails, TGenericErrorResponse } from "../interface/error";

const handleGenericError = (err: any): TGenericErrorResponse => {
    const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const details: TDetails = [
        {
            path: err?.path || "",
            message: err.message,
        },
    ];
    return {
        statusCode,
        message: "Internal Server Error",
        details
    }
}

export default handleGenericError;