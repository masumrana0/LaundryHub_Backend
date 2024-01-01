/**
 * Title: 'Authentication router'
 * Description: 'set authentication router'
 * Author: 'Masum Rana'
 * Date: 29-12-2023
 *
 */

import express from 'express';
import validateRequest from '../../../middlewares/ValidateRequest';
import { authValidationSchema } from '../auth.validation';
import { AuthController } from './customer.controller';

const router = express.Router();

router.post(
  '/register',
  validateRequest(authValidationSchema.customerRegisterZodSchema),
  AuthController.userRegistration,
);

router.post(
  '/login',
  validateRequest(authValidationSchema.userLoginZodSchema),
  AuthController.loginUser,
);
export const CustomerthRoutes = router;
