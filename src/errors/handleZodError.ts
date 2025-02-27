import { ZodError, ZodIssue } from 'zod';
import { TDetails, TGenericErrorResponse } from '../interface/error';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
    const details: TDetails = err.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue.message,
        };
    });

    const statusCode = 400;

    return {
        statusCode,
        message: 'Zod Validation Error',
        details,
    };
};

export default handleZodError;