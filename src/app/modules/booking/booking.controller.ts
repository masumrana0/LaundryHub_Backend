import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse, { IApiResponse } from '../../../shared/sendResponse';
import { IBooking } from './booking.interface';
import httpStatus from 'http-status';
import { BookingService } from './booking.service';
import pick from '../../../shared/pick';
import { paginationHelpers } from '../../../helper/paginationHelper';
import { BookingFilterAbleFiled } from './booking.constant';

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
  const paginationOptions = pick(query, paginationHelpers.paginationFields);
  const filters = pick(query, BookingFilterAbleFiled);
  const result = await BookingService.getAllbooking(paginationOptions, filters);
  sendResponse <
    IApiResponse<IBooking | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking Cancel successfull !',
      data: result,
    });
});

export const BookingController = {
  makeBooking,
  updateBookingDeliveryDate,
  cancelBooking,
};