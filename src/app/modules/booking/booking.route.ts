import express from 'express';
import validateRequest from '../../middlewares/ValidateRequest';
import { BookingZodValidationSchema } from './bookingValidation';
import { BookingController } from './booking.controller';

const router = express.Router();

router.post(
  '/',
  // validateRequest(BookingZodValidationSchema.BookingZodSchema),
  BookingController.makeBooking,
);

router.patch('/:id', BookingController.updateBookingDeliveryDate);

router.delete('/:id', BookingController.cancelBooking);
export const BookingRoutes = router;
