import { z } from 'zod'

export const SelectComponentShcema = z.object({
  location: z.string().optional(),
  restaurant: z.string().optional(),
})

export const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
})

export const registerSchema = z
  .object({
    firstname: z.string().min(1, { message: 'Please enter your first name' }),
    lastname: z.string().min(1, { message: 'Please enter your last name' }),
    phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
    otp: z.string().optional(),
    confirmPassword: z.string(),
    role: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export const restaurantRegisterSchema = z
  .object({
    firstname: z.string().min(1, { message: 'Please enter your first name' }),
    lastname: z.string().min(1, { message: 'Please enter your last name' }),
    phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
    confirmPassword: z.string(),
    restaurantName: z.string(),
    address: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
export const restaurantRegisterSecondSchema = z.object({
  restaurantName: z.string(),
  address: z.string(),
})

export const updateUserSchema = z.object({
  firstname: z.string().min(1, { message: 'Please enter your first name' }),
  lastname: z.string().min(1, { message: 'Please enter your last name' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
})

export const createFavListSchema = z.object({
  listName: z.string(),
})
