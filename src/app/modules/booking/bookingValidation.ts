import { z } from 'zod';

const ServiceSchema = z.object({
  service: z.string(),
  cleaningProduct: z.union([z.string(), z.object({ _id: z.string() })]),
  cleaningProductItem: z.number(),
});

// Zod validation schema for IBooking
const BookingZodSchema = z.object({
  body: z.object({
    services: z.array(ServiceSchema, {
      required_error: 'user service is required for booking',
    }),
    grandPrice: z.number({ required_error: 'grandPrice is required' }),
    address: z.string({ required_error: 'address is required' }),
    pickupDate: z.string({ required_error: 'bookingDate is required' }),
    deliveryDate: z.string({ required_error: 'deliveryDate is required' }),
  }),
});

export const BookingZodValidationSchema = {
  BookingZodSchema,
};
