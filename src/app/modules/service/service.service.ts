/**
 * Title: 'Service's service'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 29-12-2023
 *
 */

import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helper/paginationHelper';
import { serviceSearchAbleField } from './service.constant';
import {
  IReview,
  IService,
  IServiceFilterAbleFiled,
} from './service.interface';
import { Review, Service } from './service.model';
import { IGenericResponse } from '../../../shared/sendResponse';
import { IPaginationOptions } from '../../../inerfaces/pagination';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

// createService
const createService = async (payload: IService): Promise<IService | null> => {
  const result = await Service.create(payload);
  return result;
};

// getSingle Service
const getSingleService = async (id: string): Promise<IService | null> => {
  const service = await Service.findById(id);
  return service;
};

// get All service
const getAllService = async (
  filters: IServiceFilterAbleFiled,
  paginationOption: IPaginationOptions,
): Promise<IGenericResponse<IService[]> | null> => {
  const { searchTerm, ...filter } = filters;

  const { page, limit, sortBy, skip, sortOrder } =
    paginationHelpers.calculatePagination(paginationOption);

  const andConditions = [];
  if (searchTerm?.length) {
    andConditions.push({
      $or: serviceSearchAbleField.map(filed => ({
        [filed]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filter).length) {
    andConditions.push({
      $and: Object.entries(filter).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  // console.log(andConditions);
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Service.find(whereConditions)
    .populate({
      path: 'reviews',
      populate: {
        path: 'user',
      },
    })
    .limit(limit)
    .skip(skip)
    .sort(sortConditions);

  // for (const service of result) {
  //   for (const review of service.reviews) {
  //     await Review.populate(review, { path: 'user' });
  //   }
  // }

  const total = await Service.countDocuments({});
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// createReview
const createReview = async (
  serviceId: string,
  review: IReview,
): Promise<IService | null> => {
  const service = await Service.findById(serviceId);
  if (!service) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Service not found');
  }

  // Create a new review based on the ReviewSchema
  const newReview = new Review(review);

  // Push the new review to the service's reviews array
  service.reviews.push(newReview);

  // Save the updated service with the new review
  await service.save();

  return service;
};

export const ServiceService = {
  createService,
  getSingleService,
  getAllService,
  createReview,
};
