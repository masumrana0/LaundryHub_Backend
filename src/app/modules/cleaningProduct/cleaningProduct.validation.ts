import { z } from 'zod';

const cleaningProductZodSchema = z.object({
  body: z.object({
    category: z.enum(['home', 'men', 'woman']),
    name: z.string({ required_error: 'name is required' }),
    price: z.number({ required_error: 'price is required' }),
  }),
});

export const CleaningProductValidation = {
  cleaningProductZodSchema,
};
