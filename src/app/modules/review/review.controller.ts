import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IReview } from './review.interface';
import httpStatus from 'http-status';
import { ReviewService } from './review.service';

// get Review
const getReview = catchAsync(async (req: Request, res: Response) => {
  const serviceId = req.params.serviceId;

  const result = await ReviewService.getReview(serviceId);

  sendResponse<IReview[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review fatched successfully !',
    data: result,
  });
});

// make review
const makeReview = catchAsync(async (req: Request, res: Response) => {
  const { ...review } = req.body;
  const userid = req.user?.userid;
  const reviewAllData = {
    ...review,
    user: userid,
  };

  const result = await ReviewService.makeReview(reviewAllData);

  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review added successfully !',
    data: result,
  });
});

export const ReviewController = {
  makeReview,
  getReview,
};
