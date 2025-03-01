import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { IUser } from './user.interface';

export const isUserExistsAndNotBlocked = (user: IUser) => {
    if (!user) {
        throw new AppError("user", httpStatus.NOT_FOUND, 'User does not exists !!');
    }

    if (user.isBlocked) {
        throw new AppError("blocked", httpStatus.UNAUTHORIZED, 'User is blocked !!');
    }
}