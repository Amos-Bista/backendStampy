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


export const businessLoginSchema = z.object({
    identifier: z
        .string()
        .min(1, "Email or phone number is required"),

    password: z
        .string()
        .min(1, "Password is required"),
});

export type BusinessLoginDto = z.infer<
    typeof businessLoginSchema
>;