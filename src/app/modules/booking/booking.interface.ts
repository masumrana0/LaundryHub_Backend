import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { ICleaningProduct } from '../cleaningProduct/cleaningProduct.interface';
import { IService } from '../service/service.interface';

export type IBookingService = {
  service: Types.ObjectId | IService;
  cleaningProduct: Types.ObjectId | ICleaningProduct;
  cleaningProductItem: number;
};

export type IBooking = {
  user?: Types.ObjectId | IUser;
  services: IBookingService[];
  grandPrice: number;
  pickupDate?: Date;
  deliveryDate: Date;
  address: string;
  isApproved: boolean;
  isDelivered: boolean;
};

export type IBookingFilterAbleFiled = {
  searchTerm?: string;
  service?: string;
};
