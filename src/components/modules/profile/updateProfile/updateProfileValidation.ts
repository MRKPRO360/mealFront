import { z } from 'zod';

const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  phoneNumber: z.string().min(10, 'Phone number is required'),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  district: z.string().min(1, 'District is required'),
  zipCode: z.string().min(4, 'Zip Code is required'),
  dietaryPreferences: z
    .array(z.string())
    .nonempty('Select at least one preference'),
  profileImg: z.string().url('Invalid image URL').optional(),
});

export default profileSchema;
