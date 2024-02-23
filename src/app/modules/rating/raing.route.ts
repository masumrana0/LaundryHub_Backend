import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/role';
import { RatingController } from './rating.controller';
import validateRequest from '../../middlewares/ValidateRequest';
import { RatingZodValidation } from './rating.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(RatingZodValidation.ratingSchema),
  auth(ENUM_USER_ROLE.CUSTOMER),
  RatingController.makeRating,
);

router.get('/:serviceId', RatingController.getRating);

export const RatingRoutes = router;
