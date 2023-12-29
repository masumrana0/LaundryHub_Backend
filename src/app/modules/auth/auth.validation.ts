/**
 * Title: 'Authentication zod Schema'
 * Description: 'User authentication zod Schema'
 * Author: 'Masum Rana'
 * Date: 29-12-2023
 *
 */

import z from 'zod';
import { userRole } from '../user/user.constant';

// user registration validation zod schema
const registerUserZodSchema = z.object({
  name: z.object(
    {
      firstName: z.string({
        required_error: 'firstName is required',
      }),
      lastName: z.string().optional(),
    },
    { required_error: 'name is requred' },
  ),
  role: z.enum(['', ...userRole], {
    required_error: 'user role is requred',
  }),
  email: z.string({ required_error: 'email is requred' }).email(),
  password: z.string({ required_error: 'password is required' }),
  phoneNumber: z.string().optional(),
});

// user login validation zod schema
const loginUserZodSchema = z.object({
  email: z.string().email(),
  password: z.string({ required_error: 'password is requred' }),
});

export const authValidationSchema = {
  registerUserZodSchema,
  loginUserZodSchema,
};
