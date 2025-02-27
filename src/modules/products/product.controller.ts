/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { ProductServices } from './product.service';

const createStationaryProduct = catchAsync(async (req: Request, res: Response) => {
    const result = await ProductServices.createStationaryProductIntoDB(req.body);
    sendResponse(res, {
        success: true,
        message: 'Product created successfully',
        statusCode: httpStatus.CREATED,
        data: result
    });
})

// async (req: Request, res: Response) => {
//     try {
//         
//         const zodParseData = ProductValidationSchema.parse(body);
//         const data = await ProductServices.createStationaryProductIntoDB(zodParseData);
//         res.status(201).send({
//             message: 'Product created successfully',
//             success: true,
//             data,
//         });
//     } catch (error: any) {
//         res.status(400).json({
//             message: 'Validation failed',
//             success: false,
//             error: error.message,
//             stack: error.stack,
//         });
//     }
// };

const getAllStationaryProducts = async (req: Request, res: Response) => {
    try {
        const data = await ProductServices.getAllStationaryProductsFromDB();
        res.send({
            message: 'Products retrieved successfully',
            status: true,
            data,
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message,
            success: false,
            error,
            stack: error.stack,
        });
    }
};

const getSingleStationaryProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.productId;
        const data = await ProductServices.getSingleStationaryProductFromDB(id);
        if (!data) {
            res.status(404).json({
                message: 'Product not found',
                success: false,
            });
        }
        res.send({
            message: 'Product retrieved successfully',
            status: true,
            data,
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message,
            success: false,
            error,
            stack: error.stack,
        });
    }
};

const updateStationaryProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.productId;
        const body = req.body;
        const data = await ProductServices.updateStationaryProductFromDB(id, body);
        if (!data) {
            res.status(404).json({
                message: 'Product not found',
                success: false,
            });
        }
        res.send({
            message: 'Product updated successfully',
            status: true,
            data,
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message,
            success: false,
            error,
            stack: error.stack,
        });
    }
};

const deleteStationaryProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.productId;
        const deletedProduct = await ProductServices.deleteStationaryProductFromDB(id);
        if (!deletedProduct) {
            res.status(404).json({
                message: 'Product not found',
                success: false,
            });
        }
        res.send({
            message: 'Product deleted successfully',
            status: true,
            data: {},
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message,
            success: false,
            error,
            stack: error.stack,
        });
    }
};

export const ProductController = {
    createStationaryProduct,
    getAllStationaryProducts,
    getSingleStationaryProduct,
    updateStationaryProduct,
    deleteStationaryProduct,
};
