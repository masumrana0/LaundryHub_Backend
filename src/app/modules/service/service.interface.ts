import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IRating = {
  user?: Types.ObjectId | IUser;
  rating?: number;
};

type arrayOFString = string;

export type IService = {
  title: string;
  images: arrayOFString[];
  details: arrayOFString[];
  rating: IRating[];
};

export type IServiceFilterAbleFiled = { searchTerm?: string; title?: string };
