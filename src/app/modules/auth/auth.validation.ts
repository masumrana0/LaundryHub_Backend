/**
 * Title: 'Authentication zod Schema'
 * Description: 'User authentication zod Schema'
 * Author: 'Masum Rana'
 * Date: 29-12-2023
 *
 */
import z from 'zod';

// User registration validation schema
// Define an enum schema for the user role

// Define the complete user schema using the enum
const registerUserZodSchema = z.object({
  name: z.object({
    firstName: z.string(),
    lastName: z.string().optional(),
  }),
  role: z.enum(['customer', 'admin', 'super_admin']),
  phoneNumber: z.string(),
  email: z.string().email(),
  password: z.string(),
});
// User login validation schema
const loginUserZodSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email format' }),
  password: z.string({ required_error: 'Password is required' }),
});

export const authValidationSchema = {
  registerUserZodSchema,
  loginUserZodSchema,
};
