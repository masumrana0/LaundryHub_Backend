import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { IService } from '../service/service.interface';

export type IRating = {
  user?: Types.ObjectId | IUser;
  service: Types.ObjectId | IService;
  rating: number;
};

export type IGetRatingData = {
  totalFiveRating: number;
  totalFourRating: number;
  totalThreeRating: number;
  totalTwoRating: number;
  totalOneRating: number;
  totalGiveCustomerRating: number;
  averageRating: number;
};
