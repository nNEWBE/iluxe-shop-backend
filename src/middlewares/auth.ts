import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { catchAsync } from '../utils/catchAsync';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        
        const token = req?.headers?.authorization;
        if (!token) {
            throw new AppError("Access token", httpStatus.UNAUTHORIZED, 'You are not authorized!');
        }

        const decoded = jwt.verify(
            token,
            config.jwt_access_secret as string,
        ) as JwtPayload;

        const { userId: email, role } = decoded;
        const user = await User.isUserExistsByEmail(email);
        if (!user) {
            throw new AppError("User", httpStatus.NOT_FOUND, 'This user is not found !');
        }

        const userStatus = user?.isBlocked;
        if (userStatus) {
            throw new AppError("Blocked", httpStatus.FORBIDDEN, 'This user is blocked !!');
        }

        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError("role",
                httpStatus.UNAUTHORIZED,
                'You are not authorized !!',
            );
        }

        req.user = decoded as JwtPayload;
        next();
    });
};

export default auth;