/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import Shurjopay, { PaymentResponse, VerificationResponse } from "shurjopay";
import config from "../../config";

import { IOrder } from "./order.interface";

export const checkOrderExists = (order: IOrder) => {
    if (!order) {
        throw new AppError('order', httpStatus.NOT_FOUND, 'Order does not exists !!');
    }
} 


const shurjopay = new Shurjopay();

shurjopay.config(
    config.sp.sp_endpoint!,
    config.sp.sp_username!,
    config.sp.sp_password!,
    config.sp.sp_prefix!,
    config.sp.sp_return_url!
);


const makePaymentAsync = async (
    paymentPayload: any
): Promise<PaymentResponse> => {
    return new Promise((resolve, reject) => {
        shurjopay.makePayment(
            paymentPayload,
            (response) => resolve(response),
            (error) => reject(error)
        );
    });
};

const verifyPaymentAsync = (
    order_id: string
): Promise<VerificationResponse[]> => {
    return new Promise((resolve, reject) => {
        shurjopay.verifyPayment(
            order_id,
            (response) => resolve(response),
            (error) => reject(error)
        );
    });
};

export const orderUtils = {
    makePaymentAsync,
    verifyPaymentAsync,
};