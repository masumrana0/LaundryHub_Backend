import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IBooking } from './booking.interface';
import httpStatus from 'http-status';
import { BookingService } from './booking.service';

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

export const BookingController = {
  makeBooking,
  updateBookingDeliveryDate,
  cancelBooking,
};
