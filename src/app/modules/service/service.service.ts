/**
 * Title: 'Service's service'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 29-12-2023
 *
 */

import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helper/paginationHelper';
import { serviceFilterAbleField } from './service.constant';
import { IService, IServiceFilterAbleFiled } from './service.interface';
import { Service } from './service.model';
import { IGenericResponse } from '../../../shared/sendResponse';
import { IPaginationOptions } from '../../../inerfaces/pagination';

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
  const { searchTerm } = filters;
  const { page, limit, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOption);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: serviceFilterAbleField.map(filed => ({
        [filed]: {
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

  const result = await Service.find(whereConditions)
    .limit(limit)
    .skip(5)
    .sort(sortConditions);

  const total = await Service.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const ServiceService = {
  createService,
  getSingleService,
  getAllService,
};
