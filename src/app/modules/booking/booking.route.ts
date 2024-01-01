import express from 'express';
import validateRequest from '../../middlewares/ValidateRequest';
import { BookingZodValidationSchema } from './bookingValidation';
import { BookingController } from './booking.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/role';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.CUSTOMER),
  validateRequest(BookingZodValidationSchema.BookingZodSchema),
  BookingController.makeBooking,
);

router.get('/', BookingController.getAllbookingData);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.updateBookingDeliveryDate,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.cancelBooking,
);

export const BookingRoutes = router;
