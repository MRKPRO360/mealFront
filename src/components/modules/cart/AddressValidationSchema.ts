import { z } from 'zod';

const addressSchema = z.object({
  address: z.object({
    street: z.string().min(5, 'Street is required'),
    city: z.string().min(3, 'City is required'),
    name: z.string().min(4, 'Name is required'),
    email: z.string().email().min(5, 'Email is required'),
  }),
});

export default addressSchema;
