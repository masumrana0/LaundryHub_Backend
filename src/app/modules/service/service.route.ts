/**
 * Title: 'Service routes'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 30-12-2023
 *
 */

import express from 'express';
// import validateRequest from '../../middlewares/ValidateRequest';
// import { ServiceValidation } from './service.Validation';
import { ServiceController } from './service.controller';

const router = express.Router();

// create service by admin
router.post(
  '/',
  //   validateRequest(ServiceValidation.serviceValidationSchema),
  ServiceController.createService,
);

// get Single service
router.get('/:id', ServiceController.getSingleService);

// get All Service
router.get('/', ServiceController.getAllService);
export const ServiceRoutes = router;
