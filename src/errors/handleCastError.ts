import mongoose from 'mongoose';
import { TDetails, TGenericErrorResponse } from '../interface/error';

const handleCastError = (
    err: mongoose.Error.CastError,
): TGenericErrorResponse => {
    const details: TDetails = [
        {
            path: err.path,
            message: err.message,
        },
    ];

    const statusCode = 400;

    return {
        statusCode,
        message: 'Cast Error',
        details,
    };
};

export default handleCastError;