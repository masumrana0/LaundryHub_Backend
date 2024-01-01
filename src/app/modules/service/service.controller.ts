/**
 * Title: 'serivice controller '
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 31-12-2023
 *
 */

import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ServiceService } from './service.service';
import { IService } from './service.interface';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { serviceFilterAbleField } from './service.constant';
import { paginationFields } from '../../../constant/pagination';

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
  const filters = pick(req.query, serviceFilterAbleField);
  const paginationOption = pick(req.query, paginationFields);
  const result = await ServiceService.getAllService(filters, paginationOption);

  sendResponse<IService[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service fetched successfully !',
    meta: result?.meta,
    data: result?.data,
  });
});

// get All Service
const makeReview = catchAsync(async (req: Request, res: Response) => {
  const { ...review } = req.body;
  const { serviceId } = req.params;
  const result = await ServiceService.createReview(serviceId, review);

  sendResponse<IService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review added successfully !',
    data: result,
  });
});

export const ServiceController = {
  createService,
  getSingleService,
  getAllService,
  makeReview,
};
