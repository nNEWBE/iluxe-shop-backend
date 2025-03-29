import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { ProductServices } from './product.service';

const createStationaryProduct = catchAsync(async (req: Request, res: Response) => {
    const result = await ProductServices.createStationaryProductIntoDB(req.file,req.body,req.user);
    sendResponse(res, {
        success: true,
        message: 'Product created successfully',
        statusCode: httpStatus.CREATED,
        data: result
    });
})

const getAllStationaryProducts = catchAsync(async (req: Request, res: Response) => {
    const data = await ProductServices.getAllStationaryProductsFromDB(req?.query);
    sendResponse(res, {
        success: true,
        message: 'Products fetched successfully',
        statusCode: httpStatus.OK,
        data
    })
})

const getAllStationaryProductsWithoutQuery = catchAsync(async (req: Request, res: Response) => {
    const data = await ProductServices.getAllStationaryProductsWithoutQueryFromDB();
    sendResponse(res, {
        success: true,
        message: 'Products fetched successfully',
        statusCode: httpStatus.OK,
        data
    })  
})

const getSingleStationaryProduct = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.productId;
    const data = await ProductServices.getSingleStationaryProductFromDB(id);
    sendResponse(res, {
        success: true,
        message: 'Product retrieved successfully',
        statusCode: httpStatus.OK,
        data
    })
})

const updateStationaryProduct = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.productId;
    const body = req.body;
    const data = await ProductServices.updateStationaryProductFromDB(id, body);
    sendResponse(res, {
        success: true,
        message: 'Product updated successfully',
        statusCode: httpStatus.OK,
        data
    })
})

const deleteStationaryProduct = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.productId;
    const data = await ProductServices.deleteStationaryProductFromDB(id);
    sendResponse(res, {
        success: true,
        message: 'Product deleted successfully',
        statusCode: httpStatus.OK,
        data
    })
})

export const ProductControllers = {
    createStationaryProduct,
    getAllStationaryProducts,
    getSingleStationaryProduct,
    getAllStationaryProductsWithoutQuery,
    updateStationaryProduct,
    deleteStationaryProduct,
};
