import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { Service } from '../service/service.model';
import { IReview } from './review.interface';
import { Review } from './review.model';

// get Review
const getReview = async (id: string): Promise<IReview[] | null> => {
  const result = await Review.find({ service: id }).populate('user');
  return result;
};

// making review
const makeReview = async (review: IReview): Promise<IReview | null> => {
  const service = await Service.findById(review.service);
  if (!service) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Service not found');
  }
  console.log(review);
  // Create a new review based on the ReviewSchema
  const result = await Review.create(review);

  return result;
};

export const ReviewService = {
  makeReview,
  getReview,
};
