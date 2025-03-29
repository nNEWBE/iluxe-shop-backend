import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { checkProductExist } from '../products/product.utils';
import { IOrder } from './order.interface';
import Order from './order.model';
import { User } from '../user/user.model';
import { isUserExistsAndNotBlocked } from '../user/user.utils';
import { checkOrderExists, orderUtils } from './order.utils';

const createOrderIntoDB = async (orderData: IOrder, client_ip: string) => {
    const user = await User.isUserExistsById(orderData.user);
    isUserExistsAndNotBlocked(user);

    const updatedProducts = await Promise.all(
        orderData.products.map(async (item) => {
            const product = await checkProductExist(item.product);

            if (product.quantity < item.quantity || !product.inStock) {
                throw new AppError("Insufficient stock", httpStatus.BAD_REQUEST, "Not enough stock available");
            }

            product.quantity -= item.quantity;
            product.inStock = product.quantity > 0;
            await product.save();

            return { product: product._id, quantity: item.quantity };
        })
    );

    let order = await Order.create({
        user,
        products: updatedProducts,
        totalPrice: orderData?.totalPrice,
    });

    const shurjopayPayload = {
        amount: order?.totalPrice,
        order_id: order._id,
        currency: "BDT",
        customer_name: user.name,
        customer_address: user.address,
        customer_email: user.email,
        customer_phone: user.phone,
        customer_city: user.city,
        client_ip,
    };

    const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

    if (payment?.transactionStatus) {
        order = await order.updateOne({
            transaction: {
                id: payment.sp_order_id,
                transactionStatus: payment.transactionStatus,
            },
        });
    }

    return payment.checkout_url;
};

const verifyPayment = async (order_id: string) => {
    const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

    if (verifiedPayment.length) {
        await Order.findOneAndUpdate(
            {
                "transaction.id": order_id,
            },
            {
                "transaction.bank_status": verifiedPayment[0].bank_status,
                "transaction.sp_code": verifiedPayment[0].sp_code,
                "transaction.sp_message": verifiedPayment[0].sp_message,
                "transaction.transactionStatus": verifiedPayment[0].transaction_status,
                "transaction.method": verifiedPayment[0].method,
                "transaction.date_time": verifiedPayment[0].date_time,
                status:
                    verifiedPayment[0].bank_status == "Success"
                        ? "Paid"
                        : verifiedPayment[0].bank_status == "Failed"
                            ? "Pending"
                            : verifiedPayment[0].bank_status == "Cancel"
                                ? "Cancelled"
                                : "",
            }
        );
    }

    return verifiedPayment;
};

const getAllOrdersFromDB = async () => {
    const result = await Order.find().populate("user", "name email")
        .populate("products.product", "name price");
    return result;
};

const getSingleUserOrdersFromDB = async (userId: string) => {
    const result = await Order.find({ user: userId })
        .populate("user", "name email")
        .populate("products.product", "name price");
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
    verifyPayment,
    getAllOrdersFromDB,
    getSingleUserOrdersFromDB,
    calculateRevenueFromDB,
    updateOrderStatusFromDB,
    deleteOrderFromDB,
};
