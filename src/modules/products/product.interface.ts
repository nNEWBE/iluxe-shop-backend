import { Types } from "mongoose";

export interface IProduct {
    _id: Types.ObjectId;
    name: string;
    brand: string;
    price: number;
    category:
    | 'Writing'
    | 'Office Supplies'
    | 'Art Supplies'
    | 'Educational'
    | 'Technology';
    description: string;
    productImage: string;
    author: Types.ObjectId;
    quantity: number;
    rating: number;
    inStock?: boolean;
}

export type TFile = {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
    size: number
}
