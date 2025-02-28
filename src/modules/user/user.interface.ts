/* eslint-disable no-unused-vars */
import { Model, Types} from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
    isBlocked: boolean;
}


export interface UserModel extends Model<IUser> {
    isUserExistsByEmail(email: string): Promise<IUser>;
    isUserExistsById(id:Types.ObjectId | string): Promise<IUser>;

    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string,
    ): Promise<boolean>;

    isJWTIssuedBeforePasswordChanged(
        passwordChangedTimestamp: Date,
        jwtIssuedTimestamp: number,
    ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;