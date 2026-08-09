import { z } from 'zod';
import { BusinessCategory } from './business.enums.js';

export const createBusinessSchema = z.object({
    name: z.string().min(2),

    slug: z.string().min(2),

    description: z.string().optional(),

    category: z.nativeEnum(BusinessCategory),

    ownerName: z.string(),

    email: z.string().email(),

    phone: z.string(),

    website: z.string().optional(),

    address: z.object({
        country: z.string(),
        state: z.string(),
        city: z.string(),
        street: z.string().optional(),
        postalCode: z.string().optional(),
    }),
});

export type CreateBusinessDto = z.infer<typeof createBusinessSchema>;