import express from 'express';
import { AdminController } from './admin.controller';
import validateRequest from '../../../middlewares/ValidateRequest';
import { authValidationSchema } from '../auth.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(authValidationSchema.adminRegisterZodSchema),
  AdminController.adminRegistration,
);
router.post(
  '/login',
  validateRequest(authValidationSchema.userLoginZodSchema),
  AdminController.adminLogin,
);

export const AdminRoutes = router;
