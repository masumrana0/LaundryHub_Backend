/**
 * Title: 'Authentication zod Schema'
 * Description: 'User authentication zod Schema'
 * Author: 'Masum Rana'
 * Date: 29-12-2023
 *
 */

import z from 'zod';

const registerUserZodSchema = z.object({
  name: z.object({
    firstName: z.string({
      required_error: 'firstName is required',
    }),
    lastName: z.string().optional(),
  }),
  email: z.string().email(),
  password: z.string({ required_error: 'password is required' }),
  phoneNumber: z.string().optional(),
});

const loginUserZodSchema = z.object({
  email: z.string().email(),
  password: z.string({ required_error: 'password is requred' }),
});
export const authValidationSchema = {
  registerUserZodSchema,
  loginUserZodSchema,
};
