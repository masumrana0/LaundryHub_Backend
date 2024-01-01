/**
 * Title: 'Service routes'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 30-12-2023
 *
 */

import express from 'express';
import validateRequest from '../../middlewares/ValidateRequest';
import { ServiceValidation } from './service.Validation';
import { ServiceController } from './service.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/role';

const router = express.Router();

// create service by admin
router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(ServiceValidation.serviceValidationSchema),
  ServiceController.createService,
);

// create Review
router.post(
  '/review',
  auth(ENUM_USER_ROLE.CUSTOMER),
  validateRequest(ServiceValidation.reviewSchema),
  ServiceController.makeReview,
);

// get Single service
router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.CUSTOMER,
  ),
  ServiceController.getSingleService,
);

// get All Service
router.get('/', ServiceController.getAllService);

export const ServiceRoutes = router;
