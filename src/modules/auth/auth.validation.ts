import { z } from "zod";

export const sendOtpSchema = z.object({
    phone: z
        .string()
        .regex(/^\d{10,15}$/, "Invalid phone number"),
});

export const verifyOtpSchema = z.object({
    phone: z
        .string()
        .regex(/^\d{10,15}$/, "Invalid phone number"),

    otp: z
        .string()
        .regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
});