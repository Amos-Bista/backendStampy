import { z } from "zod";

export const createCustomerSchema = z.object({
    body: z.object({
        phone: z
            .string()
            .min(10)
            .max(15),

        fullName: z.string().optional(),

        email: z.string().email().optional(),
    }),
});

export const updateCustomerSchema = z.object({
    body: z.object({
        fullName: z.string().optional(),
        email: z.string().email().optional(),
        profileImage: z.string().optional(),
    }),
});