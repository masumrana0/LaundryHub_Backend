import express from 'express';
import validateRequest from '../../middlewares/ValidateRequest';
import { ReviewZodValidation } from './review.validation';
import { ReviewController } from './review.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/role';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.CUSTOMER),
  validateRequest(ReviewZodValidation.reviewSchema),
  ReviewController.makeReview,
);

router.get('/:serviceId', ReviewController.getReview);

export const ReviewRoutes = router;
