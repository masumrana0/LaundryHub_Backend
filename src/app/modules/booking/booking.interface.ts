import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { ICleaningProduct } from '../cleaningProduct/cleaningProduct.interface';

export type IBookingService = {
  service: string;
  cleaningProduct: Types.ObjectId | ICleaningProduct;
  cleaningProductItem: number;
};

export type IBooking = {
  user: Types.ObjectId | IUser;
  services: IBookingService[];
  grandPrice: number;
  bookingDate: Date;
  deliveryDate: Date;
  isDelivered: boolean;
};

export type IBookingFilterAbleFiled = {
  searchTerm?: string;
  service?: string;
};
                 