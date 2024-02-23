import express from 'express';
import validateRequest from '../../middlewares/ValidateRequest';
import { CleaningProductValidation } from './cleaningProduct.validation';
import { cleaningProductController } from './cleaningProduct.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/role';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(CleaningProductValidation.cleaningProductZodSchema),
  cleaningProductController.createCleaningProduct,
);

router.get('/', cleaningProductController.getAllCleaningProduct);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  cleaningProductController.updateCleaningProduct,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  cleaningProductController.deleteCleaningProduct,
);

export const CleaningProductRoutes = router;
