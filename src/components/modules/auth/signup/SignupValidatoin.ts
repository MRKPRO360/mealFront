import { cuisineSpecialties } from '@/constants/cuisineSpecialties';
import { z } from 'zod';

export const signupSchema = (selectedRole: string | null) =>
  z
    .object({
      name: z.object({
        firstName: z.string().min(1, 'First name is required'),
        lastName: z.string().min(1, 'Last name is required'),
      }),
      email: z.string().email('Invalid email format'),
      phoneNumber: z
        .string()
        .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number format'),
      password: z
        .string()
        .min(6, 'Password must be at least 6 characters long'),
      confirmPassword: z.string(),
      cuisineSpecialties: z
        .array(z.enum(cuisineSpecialties))
        .optional()
        .refine(
          (value) => selectedRole !== 'provider' || (value && value.length > 0),
          {
            message: 'Cuisine Specialties are required for providers',
          }
        ),
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
