import { IProduct } from './product.interface';
import Product from './product.model';

const createStationaryProductIntoDB = async (productData: IProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getAllStationaryProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

const getSingleStationaryProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

const updateStationaryProductFromDB = async (
  id: string,
  productData: Partial<IProduct>,
) => {
  const result = await Product.findOneAndUpdate({ _id: id }, productData, {
    new: true,
  });
  return result;
};

const deleteStationaryProductFromDB = async (id: string) => {
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
