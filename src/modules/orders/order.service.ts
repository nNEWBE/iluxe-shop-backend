import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { checkProductExist } from '../products/product.utils';
import { IOrder } from './order.interface';
import Order from './order.model';
import { User } from '../user/user.model';
import { isUserExistsAndNotBlocked } from '../user/user.utils';
import { checkOrderExists } from './order.utils';

const createOrderIntoDB = async (orderData: IOrder) => {
    const user = await User.isUserExistsByEmail(orderData.email);
    isUserExistsAndNotBlocked(user);

    const product = await checkProductExist(orderData.product);
    if (product.quantity < orderData.quantity || !product.inStock) {
        throw new AppError('quantity', httpStatus.BAD_REQUEST, 'Insufficient stock');
    }

    product.quantity -= orderData.quantity;
    product.inStock = product.quantity > 0;
    orderData.totalPrice = product.price * orderData.quantity
    await product.save();

    const result = await Order.create(orderData);
    return result;
};

const getAllOrdersFromDB = async () => {
    const result = await Order.find().populate('product');
    return result;
};

const updateOrderStatusFromDB = async (orderId: string, status: string) => {
    const order = await Order.findById(orderId);
    checkOrderExists(order as IOrder);
    const result = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    return result;
}

const deleteOrderFromDB = async (orderId: string) => {
    const order = await Order.findById(orderId);
    checkOrderExists(order as IOrder);
    const result = await Order.findByIdAndDelete(orderId);
    return result;
}

const calculateRevenueFromDB = async (): Promise<number> => {
    const result = await Order.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$totalPrice' },
            },
        },
    ]);
    return result.length > 0 ? result[0].totalRevenue : 0;
};

export const OrderServices = {
    createOrderIntoDB,
    getAllOrdersFromDB,
    calculateRevenueFromDB,
    updateOrderStatusFromDB,
    deleteOrderFromDB,
};
