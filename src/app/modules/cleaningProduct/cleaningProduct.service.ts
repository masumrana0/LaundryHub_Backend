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

// update  Laundry Cleaning product Data
const updateCleaningProduct = async (
  payload: Partial<ICleaningProduct>,
  id: string,
): Promise<ICleaningProduct | null> => {
  const result = await CleaningProduct.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

// delete laundry Cleaning Product
const deleteCleaningProduct = async (
  id: string,
): Promise<ICleaningProduct | null> => {
  const result = await CleaningProduct.findByIdAndDelete(id);
  return result;
};

export const cleaningProductService = {
  createCleaningProduct,
  getAllCleaningProduct,
  updateCleaningProduct,
  deleteCleaningProduct,
};
