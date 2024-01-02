/**
 * Title: 'Booking Service'
 * Description: 'In this Booking Services page I will doing make booking, getAllBookig, updatebooking and delete booking'
 * Author: 'Masum Rana'
 * Date: 31-12-2023
 *
 */

import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../shared/sendResponse';
import { IServiceFilterAbleFiled } from '../service/service.interface';
import { BookingFilterAbleFiled } from './booking.constant';
import { IBooking } from './booking.interface';
import { Booking, ServiceBooking } from './booking.model';
import { IPaginationOptions } from '../../../inerfaces/pagination';

// make booking
const makeBooking = async (payload: IBooking): Promise<IBooking | null> => {
  const result = await Booking.create(payload);
  for (const service of result.services) {
    // Assuming `service.cleaningProduct` is the field to be populated
    await ServiceBooking.populate(service, { path: 'cleaningProduct' });
  }
  return result;
};

// update deliveryBookingDate
const updateBookingData = async (
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

  const andConditions = [];
  // implementaion for searching
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

  // Assuming 'result array' holds the fetched data
  const result: IBooking[] = await Booking.find(whereConditions)
    .populate('user')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  // populate nested fileďs
  for (const booking of result) {
    for (const service of booking.services) {
      // Assuming `service.cleaningProduct` is the field to be populated
      await ServiceBooking.populate(service, { path: 'cleaningProduct' });
    }
  }

  // Count total booking data
  const total = await Booking.countDocuments({});

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get all Booking
const getSpecificUserBookingData = async (
  paginationOptions: IPaginationOptions,
  id: string,
): Promise<IGenericResponse<IBooking[] | null>> => {
  // pagination essentials
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  // Dynamic Sort needs field to do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // Fetching data using find method
  const result = await Booking.find({ user: id })
    .populate('user')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  console.log(result);
  if (!result) {
    return {
      meta: {
        page,
        limit,
        total: 0,
      },
      data: null,
    };
  }

  // populate nested fields
  for (const booking of result) {
    for (const service of booking.services) {
      // Assuming `service.cleaningProduct` is the field to be populated
      await ServiceBooking.populate(service, { path: 'cleaningProduct' });
    }
  }

  // Count total booking data
  const total = await Booking.countDocuments({});

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const BookingService = {
  makeBooking,
  updateBookingData,
  cancelBooking,
  getAllbooking,
  getSpecificUserBookingData,
};
