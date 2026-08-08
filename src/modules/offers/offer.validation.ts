import { z } from "zod";

export const createOfferSchema = z.object({
    title: z.string().min(3).max(100),

    businessId: z.string(),

    description: z.string().optional(),

    image: z.string().optional(),

    requiredStamps: z.number().min(1),

    expiryDate: z.string().optional(),

    isActive: z.boolean().optional(),
});

export const updateOfferSchema =
    createOfferSchema.partial();