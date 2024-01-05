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
  }),
});

export const ServiceValidation = {
  serviceValidationSchema,
};
