import z from 'zod';
// Define a Zod schema for the IRating type
const ratingSchema = z.object({
  body: z.object({
    service: z.string({
      required_error: 'service reference id is required',
    }),
    rating: z.number({
      required_error: 'review is required',
    }),
  }),
});

export const RatingZodValidation = {
  ratingSchema,
};
