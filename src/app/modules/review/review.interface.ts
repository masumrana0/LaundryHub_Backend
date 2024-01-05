import { Types } from 'mongoose';
import { IService } from '../service/service.interface';
import { IUser } from '../user/user.interface';

export type IReview = {
  service: Types.ObjectId | IService;
  user: Types.ObjectId | IUser;
  review: string;
};
