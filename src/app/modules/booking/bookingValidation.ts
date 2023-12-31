import { z } from 'zod';

const ServiceSchema = z.object({
  service: z.string(),
  cleaningProduct: z.union([z.string(), z.object({ _id: z.string() })]),
  cleaningProductItem: z.number(),
});

// Zod validation schema for IBooking
const BookingZodSchema = z.object({
  user: z.string({ required_error: 'user objectId is required' }),
  services: z.array(ServiceSchema, {
    required_error: 'user service is required for booking',
  }),
  grandPrice: z.number(),
  bookingDate: z.date(),
  deliveryDate: z.date(),
});

export const BookingZodValidationSchema = {
  BookingZodSchema,
};
