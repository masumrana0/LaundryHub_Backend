/**
 * Title: 'Authentication router'
 * Description: 'set authentication router'
 * Author: 'Masum Rana'
 * Date: 29-12-2023
 *
 */

import express from 'express';
import validateRequest from '../../middlewares/ValidateRequest';
// import { authValidationSchema } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/register',
  // validateRequest(authValidationSchema.registerUserZodSchema),
  AuthController.userRegistration,
);

router.post(
  '/login',
  // validateRequest(authValidationSchema.loginUserZodSchema),
  AuthController.loginUser,
);
export const authRoutes = router;
