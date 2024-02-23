import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ICleaningProduct } from './cleaningProduct.interface';
import { cleaningProductService } from './cleaningProduct.service';

// create cleaning product
const createCleaningProduct = catchAsync(
  async (req: Request, res: Response) => {
    const { ...data } = req.body;

    const result = await cleaningProductService.createCleaningProduct(data);

    sendResponse<ICleaningProduct>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cleaning Product created successfully !',
      data: result,
    });
  },
);

// get All Cleaning Product
const getAllCleaningProduct = catchAsync(
  async (req: Request, res: Response) => {
    const result = await cleaningProductService.getAllCleaningProduct();

    sendResponse<ICleaningProduct[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cleaning Product fatched successfully !',
      data: result,
    });
  },
);

// get All Cleaning Product
const updateCleaningProduct = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    // console.log(id)
    const { ...updatedData } = req.body;
    const result = await cleaningProductService.updateCleaningProduct(
      updatedData,
      id,
    );

    sendResponse<ICleaningProduct>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cleaning Product update successfully !',
      data: result,
    });
  },
);

// delete Cleaning Product
const deleteCleaningProduct = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await cleaningProductService.deleteCleaningProduct(id);

    sendResponse<ICleaningProduct>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cleaning Product delete successfully !',
      data: result,
    });
  },
);

export const cleaningProductController = {
  createCleaningProduct,
  getAllCleaningProduct,
  updateCleaningProduct,
  deleteCleaningProduct,
};
