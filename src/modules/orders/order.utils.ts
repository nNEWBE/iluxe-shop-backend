import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IOrder } from "./order.interface";

export const checkOrderExists = (order: IOrder) => {
    if (!order) {
        throw new AppError('order', httpStatus.NOT_FOUND, 'Order does not exists !!');
    }
} 