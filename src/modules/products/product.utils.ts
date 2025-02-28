import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import Product from "./product.model";
import { User } from "../user/user.model";

export const checkBlogOwnership = async (userId: Types.ObjectId, user: JwtPayload) => {
    const isAuthorExist = await User.isUserExistsById(userId);
    if (!isAuthorExist) {
        throw new AppError("author", httpStatus.NOT_FOUND, 'Author does not exists !!');
    }

    if (isAuthorExist.email !== user.userId) {
        throw new AppError("Unauthorized", httpStatus.UNAUTHORIZED, 'You are not authorized !!');
    }
}

export const checkBlogExist = async (blogId: string) => {
    const isBlogExist = await Product.findById(blogId);
    if (!isBlogExist) {
        throw new AppError("product", httpStatus.NOT_FOUND, 'Product does not exists !!');
    }
    return isBlogExist
}