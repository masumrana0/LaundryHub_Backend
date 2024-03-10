import express from 'express';
import validateRequest from '../../middlewares/ValidateRequest';
import { authValidationSchema } from './auth.validation';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/role';

const router = express.Router();

router.get('/verification', AuthController.verification);
router.get(
  '/verification/client',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.CUSTOMER,
  ),
  AuthController.verificationEmailSendByClient,
);

router.post(
  '/login',
  // validateRequest(authValidationSchema.userLoginZodSchema),
  AuthController.userLogin,
);

router.post(
  '/refresh-token',
  validateRequest(authValidationSchema.refreshTokenZodSchema),
  AuthController.refreshToken,
);

router.post(
  '/change-password',
  validateRequest(authValidationSchema.changePasswordZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER,
  ),
  AuthController.changePassword,
);

export const AuthRoutes = router;
