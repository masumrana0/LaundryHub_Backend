import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IReview = {
  user?: Types.ObjectId | IUser;
  review?: string;
};

type arrayOFString = string;

export type IService = {
  title: string;
  images: arrayOFString[];
  details: arrayOFString[];
  reviews: IReview[];
};

export type IServiceFilterAbleFiled = { searchTerm?: string; title?: string };
