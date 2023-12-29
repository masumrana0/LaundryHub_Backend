/**
 * Title: 'Service's service'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 29-12-2023
 *
 */

import { IService } from './service.interface';
import { Service } from './service.model';

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
const getAllService = async (): Promise<IService[] | null> => {
    
};

export const ServiceService = {
  createService,
  getSingleService,
  getAllService,
};
