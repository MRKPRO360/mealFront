import { z } from 'zod';

export const signupSchema = z.object({
  name: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
  }),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string(),
  email: z.string().email('Invalid email format'),
  phoneNumber: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number format'),
  profileImg: z.string().optional(),
  address: z.object({
    street: z.string().optional(),
    district: z.string().optional(),
    city: z.string().optional(),
    zipCode: z
      .string()
      .regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format')
      .optional(),
  }),
});
