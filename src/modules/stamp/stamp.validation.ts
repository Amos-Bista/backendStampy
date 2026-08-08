import { z } from "zod";

export const createStampSchema = z.object({
    customerId: z.string().min(1),
    businessId: z.string().min(1),
    offerId: z.string().optional(),
    qrCode: z.string().optional(),
});