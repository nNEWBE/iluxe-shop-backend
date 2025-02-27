import { Types } from "mongoose";

export interface IProduct {
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
    inStock: boolean;
}
