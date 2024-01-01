/**
 * Title: 'Authentication zod Schema'
 * Description: 'User authentication zod Schema'
 * Author: 'Masum Rana'
 * Date: 29-12-2023
 *
 */

import z from 'zod';
import { userRole } from '../user/user.constant';

// User registration validation schema
const registerUserZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string(),
      lastName: z.string().optional(),
    }),
    role: z.enum(['', ...userRole]).optional(),
    phoneNumber: z.string(),
    email: z.string().email(),
    password: z.string(),
  }),
});

// User login validation schema
const loginUserZodSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email format' }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

export const authValidationSchema = {
  registerUserZodSchema,
  loginUserZodSchema,
};
