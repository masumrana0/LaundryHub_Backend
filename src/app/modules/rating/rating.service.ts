import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { Service } from '../service/service.model';
import { IGetRatingData, IRating } from './rating.interface';
import { Rating } from './rating.model';

// get Review
const getRating = async (id: string): Promise<IGetRatingData | null> => {
  const result = await Rating.find({ service: id });
  const fiveRating = [];
  const fourRating = [];
  const threeRating = [];
  const twoRating = [];
  const oneRating = [];

  for (const rating of result) {
    if (rating.rating === 5) {
      fiveRating.push(5);
    } else if (rating.rating === 4) {
      fourRating.push(4);
    } else if (rating.rating === 3) {
      threeRating.push(3);
    } else if (rating.rating === 2) {
      twoRating.push(2);
    } else if (rating.rating === 1) {
      oneRating.push(1);
    }
  }

  const totalFiveRating = fiveRating.length;
  const totalFourRating = fourRating.length;
  const totalThreeRating = threeRating.length;
  const totalTwoRating = twoRating.length;
  const totalOneRating = oneRating.length;

  const totalCount =
    totalFiveRating +
    totalFourRating +
    totalThreeRating +
    totalTwoRating +
    totalOneRating;

  const weightedSum =
    5 * totalFiveRating +
    4 * totalFourRating +
    3 * totalThreeRating +
    2 * totalTwoRating +
    1 * totalOneRating;

  const averageRating = Math.floor(
    totalCount > 0 ? weightedSum / totalCount : 0,
  );

  const ratingData: IGetRatingData = {
    totalFiveRating,
    totalFourRating,
    totalThreeRating,
    totalTwoRating,
    totalOneRating,
    totalGiveCustomerRating: totalCount,
    averageRating,
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
