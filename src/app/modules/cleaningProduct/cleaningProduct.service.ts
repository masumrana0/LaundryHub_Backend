import { ICleaningProduct } from './cleaningProduct.interface';
import { CleaningProduct } from './cleaningProduct.model';

// Create Laundry Cleaning Product
const createCleaningProduct = async (
  payload: ICleaningProduct,
): Promise<ICleaningProduct | null> => {
  const result = await CleaningProduct.create(payload);
  return result;
};

// get Laundry Cleaning Product
const getAllCleaningProduct = async (): Promise<ICleaningProduct[] | null> => {
  const result = await CleaningProduct.find({});
  return result;
};

export const cleaningProductService = {
  createCleaningProduct,
  getAllCleaningProduct,
};
