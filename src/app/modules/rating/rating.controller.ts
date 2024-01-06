import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { RatingService } from './rating.service';
import { IGetRatingData, IRating } from './rating.interface';

// get Review
const getRating = catchAsync(async (req: Request, res: Response) => {
  const serviceId = req.params.serviceId;

  const result = await RatingService.getRating(serviceId);

  sendResponse<IGetRatingData>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rating fatched successfully !',
    data: result,
  });
});

// make review
const makeRating = catchAsync(async (req: Request, res: Response) => {
  const { ...rating } = req.body;
  const userid = req.user?.userid;
  const ratingData = {
    ...rating,
    user: userid,
  };

  const result = await RatingService.makeRating(ratingData);

  sendResponse<IRating>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rating added successfully !',
    data: result,
  });
});

export const RatingController = {
  makeRating,
  getRating,
};
