import { z } from 'zod';

export const signupSchema = z
  .object({
    name: z.object({
      firstName: z.string().min(1, 'First name is required'),
      lastName: z.string().min(1, 'Last name is required'),
    }),
    email: z.string().email('Invalid email format'),
    phoneNumber: z
      .string()
      .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string(),
    // role: z.enum(['customer', 'provider'], {
    //   required_error: 'Role is required',
    // }),

    address: z
      .object({
        street: z.string().optional(),
        district: z.string().optional(),
        city: z.string().optional(),
        zipCode: z
          .string()
          .regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format')
          .optional(),
      })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
