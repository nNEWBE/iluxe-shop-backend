import { JwtPayload } from 'jsonwebtoken';
import { IProduct } from './product.interface';
import Product from './product.model';
import { checkProductExist, checkProductOwnership } from './product.utils';
import QueryBuilder from '../../builder/QueryBuilder';

const createStationaryProductIntoDB = async (productData: IProduct, user: JwtPayload) => {
  await checkProductOwnership(productData.author, user);
  const result = (await Product.create(productData)).populate("author");
  return result;
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
