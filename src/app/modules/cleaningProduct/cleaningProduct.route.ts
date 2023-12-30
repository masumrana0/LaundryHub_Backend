import express from 'express';
import validateRequest from '../../middlewares/ValidateRequest';
import { CleaningProductValidation } from './cleaningProduct.validation';
import { cleaningProductController } from './cleaningProduct.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(CleaningProductValidation.cleaningProductZodSchema),
  cleaningProductController.createCleaningProduct,
);

router.get('/', cleaningProductController.getAllCleaningProduct);

export const cleaningProductRoutes = router;
