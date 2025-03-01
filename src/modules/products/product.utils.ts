import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import Product from "./product.model";
import { User } from "../user/user.model";

export const checkProductOwnership = async (userId: Types.ObjectId, user: JwtPayload) => {
    const isAuthorExist = await User.isUserExistsById(userId);
    if (!isAuthorExist) {
        throw new AppError("author", httpStatus.NOT_FOUND, 'Author does not exists !!');
    }

    if (isAuthorExist.email !== user.userId) {
        throw new AppError("unauthorized", httpStatus.UNAUTHORIZED, 'You are not authorized !!');
    }
}

export const checkProductExist = async (productId: string | Types.ObjectId) => {
    const isProductExist = await Product.findById(productId);
    if (!isProductExist) {
        throw new AppError("product", httpStatus.NOT_FOUND, 'Product does not exists !!');
    }
    return isProductExist
}