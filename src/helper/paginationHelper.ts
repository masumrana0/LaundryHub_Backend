/**
 * Title: 'Pagination Utilites'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 29-12-2023
 *
 */

import { SortOrder } from 'mongoose';

type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

export type IPaginationOptions = {
  page?: number;
  limit?: number;
  skip?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

const paginationFields = ['page', 'limit', 'sortBy', 'sortOrder'];

const calculatePagination = (options: IOptions): IPaginationOptions => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const skip = Number((page - 1) * limit);

  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelpers = {
  calculatePagination,
  paginationFields,
};
