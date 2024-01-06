import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { Service } from '../service/service.model';
import { IGetRatingData, IRating } from './rating.interface';
import { Rating } from './rating.model';

// get Review
const getRating = async (id: string): Promise<IGetRatingData | null> => {
  const result = await Rating.find({ service: id }).populate('user');
  const fiveRating = [];
  const fourRating = [];
  const threeRating = [];
  const twoRating = [];
  const oneRating = [];

  for (const rating of result) {
    if (rating.rating == 5) {
      fiveRating.push(5);
    } else if (rating.rating == 4) {
      fourRating.push(4);
    } else if (rating.rating == 3) {
      threeRating.push(3);
    } else if (rating.rating == 2) {
      twoRating.push(2);
    } else if (rating.rating == 1) {
      oneRating.push(1);
    }
  }
  const ratingData = {
    totalFiveRating: fiveRating.length,
    totalFourRating: fourRating.length,
    totalThreeRating: threeRating.length,
    totalTwoRating: twoRating.length,
    totalOneRating: oneRating.length,
  };
  return ratingData;
};

// making review
const makeRating = async (rating: IRating): Promise<IRating | null> => {
  const service = await Service.findById(rating.service);
  if (!service) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Service not found');
  }

  // Create a new review based on the ReviewSchema
  const result = await Rating.create(rating);
  return result;
};

export const RatingService = {
  makeRating,
  getRating,
};
