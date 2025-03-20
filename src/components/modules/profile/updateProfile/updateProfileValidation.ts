import { z } from 'zod';

const profileSchema = z
  .object({
    name: z.object({
      firstName: z.string().min(1, 'First name is required'),
      lastName: z.string().min(1, 'Last name is required'),
    }),
    email: z.string().email('Invalid email'),
    phoneNumber: z.string().min(10, 'Phone number is required'),
    address: z.object({
      street: z.string().min(5, 'Street is required'),
      city: z.string().min(3, 'City is required'),
      district: z.string().min(4, 'District is required'),
      zipCode: z.string().min(4, 'Zip Code is required'),
    }),
    dietaryPreferences: z.array(z.string()).optional(),
    cuisineSpecialties: z.array(z.string()).optional(),
    profileImg: z.string().url('Invalid image URL').optional(),
    role: z.enum(['customer', 'provider', 'admin']), // 👈 Ensure role is present
  })
  .superRefine((data, ctx) => {
    if (data.role === 'customer' && data.cuisineSpecialties?.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Customers should not have cuisine specialties',
        path: ['cuisineSpecialties'],
      });
    }

    if (data.role === 'provider' && data.dietaryPreferences?.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Providers should not have dietary preferences',
        path: ['dietaryPreferences'],
      });
    }
  });
export default profileSchema;
