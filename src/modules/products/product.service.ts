/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';
import { IProduct, TFile } from './product.interface';
import Product from './product.model';
import { checkProductExist, checkProductOwnership } from './product.utils';
import QueryBuilder from '../../builder/QueryBuilder';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import mongoose from 'mongoose';

const createStationaryProductIntoDB = async (file: TFile | undefined, productData: IProduct, user: JwtPayload) => {

  await checkProductOwnership(productData.author, user);
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    if (file) {
      const imageName = productData.name;
      const path = file?.path;

      const { secure_url } = await sendImageToCloudinary(imageName, path);
      productData.productImage = secure_url as string;
    }
    const result = (await Product.create([productData], { session }));
    await session.commitTransaction();
    await session.endSession();

    const populatedResult = await Product.findById(result).populate("author");
    return populatedResult;
  }
  catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const getAllStationaryProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find().populate("author")
    , query)
    .search(['name', 'brand', 'category'])
    .sort()
    .filter()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();

  return {
    meta,
    result,
  }
};

const getSingleStationaryProductFromDB = async (id: string) => {
  await checkProductExist(id);
  const result = await Product.findById(id);
  return result;
};

const updateStationaryProductFromDB = async (id: string, productData: Partial<IProduct>) => {
  await checkProductExist(id);
  const result = await Product.findByIdAndUpdate(id, productData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStationaryProductFromDB = async (id: string) => {
  await checkProductExist(id);
  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const ProductServices = {
  createStationaryProductIntoDB,
  getAllStationaryProductsFromDB,
  getSingleStationaryProductFromDB,
  updateStationaryProductFromDB,
  deleteStationaryProductFromDB,
};
