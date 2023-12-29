import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ServiceService } from './service.service';
import { IService } from './service.interface';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';

// create service
const createService = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;

  const result = await ServiceService.createService(data);

  sendResponse<IService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service created successfully !',
    data: result,
  });
});

// get single service
const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ServiceService.getSingleService(id);

  sendResponse<IService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service fetched successfully !',
    data: result,
  });
});

// get All Service
const getAllService = catchAsync(async (req: Request, res: Response) => {
   

  const result = await ServiceService.getAllService(id);

  sendResponse<IService[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service fetched successfully !',
    //  meta:
    data: result,
  });
});

export const ServiceController = {
  createService,
  getSingleService,
  getAllService,
};
