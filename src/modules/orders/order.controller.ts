import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createOrder = catchAsync(async (req: Request, res: Response) => {
    const orderData = req.body;
    const order = await OrderServices.createOrderIntoDB(orderData);
    sendResponse(res, {
        success: true,
        message: 'Order created successfully',
        statusCode: httpStatus.CREATED,
        data: order
    })
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
    const data = await OrderServices.getAllOrdersFromDB();
    sendResponse(res, {
        success: true,
        message: 'Orders retrieved successfully',
        statusCode: httpStatus.OK,
        data
    })
})

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.orderId;
    const {status} = req.body;
    const data = await OrderServices.updateOrderStatusFromDB(id, status);
    sendResponse(res, {
        success: true,
        message: 'Order status updated successfully',
        statusCode: httpStatus.OK,
        data
    })
})

const deleteOrder= catchAsync(async (req: Request, res: Response) => {
    const id = req.params.orderId;
    const data = await OrderServices.deleteOrderFromDB(id);
    sendResponse(res, {
        success: true,
        message: 'Order deleted successfully',
        statusCode: httpStatus.OK,
        data
    })
})


const calculateRevenue = catchAsync(async (req: Request, res: Response) => {
    const totalRevenue = await OrderServices.calculateRevenueFromDB();
    sendResponse(res, {
        success: true,
        message: 'Revenue calculated successfully',
        statusCode: 200,
        data: { totalRevenue }
    })
})

export const OrderController = {
    createOrder,
    getAllOrders,
    calculateRevenue,
    updateOrderStatus,
    deleteOrder,
};
