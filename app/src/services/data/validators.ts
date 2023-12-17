/* eslint-disable camelcase */
import * as z from 'zod';
export const userSchema = z.object({
  username: z.string().min(3).max(100),
  first_name: z
    .string()
    .min(3)
    .max(50)
    .transform((data) => data.trim()),
  last_name: z
    .string()
    .min(3)
    .max(50)
    .transform((data) => data.trim())
    .nullable(),
  email: z.string().email(),
  mobile: z
    .string()
    .regex(/^\+?\d{10}$/)
    .nullable()
    .optional(),
  password: z
    .string()
    .min(5)
    .max(100)
    .transform((data) => data.trim()),
  verified: z.boolean().default(false),
  social: z
    .object({
      linkedIn: z.string().url().nullable(),
    })
    .nullable()
    .optional(),
});
