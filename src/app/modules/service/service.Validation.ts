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
    images: z.array(z.string(), {
      required_error: 'image is required',
    }),
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

// Define a Zod schema for the IReview type
const reviewSchema = z.object({
  body: z.object({
    user: z.string({ required_error: 'userObject id is required' }),
    review: z.string({
      required_error: 'review is required',
    }),
  }),
});

export const ServiceValidation = {
  serviceValidationSchema,
  reviewSchema,
};
