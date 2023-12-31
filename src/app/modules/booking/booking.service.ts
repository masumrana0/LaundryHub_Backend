import { SortOrder } from 'mongoose';
import {
  IPaginationOptions,
  paginationHelpers,
} from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../shared/sendResponse';
import { IServiceFilterAbleFiled } from '../service/service.interface';
import { BookingFilterAbleFiled } from './booking.constant';
import { IBooking } from './booking.interface';
import { Booking } from './booking.model';

// make booking
const makeBooking = async (payload: IBooking): Promise<IBooking | null> => {
  const result = (await Booking.create(payload)).populate('services.item');
  return result;
};

// update deliveryBookingDate
const updateBookingDeliveryDate = async (
  payload: Partial<IBooking>,
  id: string,
): Promise<IBooking | null> => {
  const result = await Booking.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

// cancel booking
const cancelBooking = async (id: string): Promise<IBooking | null> => {
  const result = await Booking.findByIdAndDelete(id);
  return result;
};

// get all Booking
const getAllbooking = async (
  paginationOptions: IPaginationOptions,
  filters: IServiceFilterAbleFiled,
): Promise<IGenericResponse<IBooking[] | null>> => {
  // Extract searchTerm to implement search query
  const { searchTerm } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  // const Page = Number(page);
  // const Limit = Number(limit);
  // const Skip = Number(skip);

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: BookingFilterAbleFiled.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Booking.find(whereConditions)
    .populate('user')
    .populate('services.cleaningProduct')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Booking.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      skip,
      total,
    },
    data: result,
  };
};

export const BookingService = {
  makeBooking,
  updateBookingDeliveryDate,
  cancelBooking,
  getAllbooking,
};
