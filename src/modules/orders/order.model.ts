import mongoose, { Schema } from 'mongoose';
import { IOrder } from './order.interface';

const OrderSchema: Schema = new Schema(
    {
        email: { type: String, required: true },
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, min: 1 },
        totalPrice: { type: Number, min: 0 },
        status: { type: String, enum: ['Pending', 'Shipping'], default: 'Pending' },
    },
    { timestamps: true },
);

const Order = mongoose.model<IOrder>('Order', OrderSchema);
export default Order;