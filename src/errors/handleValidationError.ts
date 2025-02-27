import mongoose from "mongoose";
import { TDetails, TGenericErrorResponse } from "../interface/error";
import httpStatus from "http-status";

const handleValidationError = (error: mongoose.Error.ValidationError): TGenericErrorResponse => {
    const details: TDetails = Object.values(error.errors).map((el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: el?.path,
            message: el?.message,
        }
    })
    const statusCode = httpStatus.BAD_REQUEST;
    return {
        statusCode,
        message: 'Validation Error',
        details
    }
}

export default handleValidationError;