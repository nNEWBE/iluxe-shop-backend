import { Types } from "mongoose";

export type orderStatus =
    | 'Pending'
    | 'Shipping'

export interface IOrder {
    email: string;
    product: Types.ObjectId;
    quantity: number;
    totalPrice?: number;
    status?: orderStatus;
}