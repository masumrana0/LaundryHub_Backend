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

const router = express.Router();

router.post(
  '/',
  validateRequest(ServiceValidation.serviceValidationSchema),
  ServiceController.createService,
);

export const ServiceRoutes = router;
