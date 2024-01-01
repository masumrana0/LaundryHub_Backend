/**
 * Title: 'Booking controller'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 31-12-2023
 *
 */

import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IBooking } from './booking.interface';
import httpStatus from 'http-status';
import { BookingService } from './booking.service';
import pick from '../../../shared/pick';
import { BookingFilterAbleFiled } from './booking.constant';
import { paginationFields } from '../../../constant/pagination';

// make booking product
const makeBooking = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;

  const result = await BookingService.makeBooking(data);

  sendResponse<IBooking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking  successfull !',
    data: result,
  });
});

// make booking product
const updateBookingDeliveryDate = catchAsync(
  async (req: Request, res: Response) => {
    const { ...data } = req.body;
    const { id } = req.params;
    const result = await BookingService.updateBookingDeliveryDate(data, id);

    sendResponse<IBooking>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking date updated  successfull !',
      data: result,
    });
  },
);

// cancel booking product
const cancelBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookingService.cancelBooking(id);

  sendResponse<IBooking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking Cancel successfull !',
    data: result,
  });
});

// get booking  data
const getAllbookingData = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const paginationOptions = pick(query, paginationFields);
  const filters = pick(query, BookingFilterAbleFiled);
  const result = await BookingService.getAllbooking(paginationOptions, filters);
  sendResponse<IBooking[] | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking Cancel successfull !',
    meta: result.meta,
    data: result.data,
  });
});

// get booking  data
const getSpecificUserBookingData = catchAsync(
  async (req: Request, res: Response) => {
    const query = req.query;
    const { userId } = req.params;
    const paginationOptions = pick(query, paginationFields);

    const result = await BookingService.getSpecificUserBookingData(
      paginationOptions,
      userId,
    );
    sendResponse<IBooking[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking fatched successfull !',
      meta: result.meta,
      data: result.data,
    });
  },
);

export const BookingController = {
  makeBooking,
  updateBookingDeliveryDate,
  cancelBooking,
  getAllbookingData,
  getSpecificUserBookingData,
};
