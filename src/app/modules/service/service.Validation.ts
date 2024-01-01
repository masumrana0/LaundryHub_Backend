/**
 * Title: 'Service zod validation'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 30-12-2023
 *
 */

import { z } from 'zod';

// Define Zod schema
const serviceValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    img: z.string({ required_error: 'img is required' }),
    details: z.array(z.string(), {
      required_error: 'details is required',
    }),
    reviews: z.array(
      z.object({
        name: z.string({ required_error: 'User name is requred' }),
        review: z.string({ required_error: 'review is required' }),
      }),
    ),
  }),
});

export const ServiceValidation = {
  serviceValidationSchema,
};
