import mongoose, { Schema, Document } from "mongoose";

export interface IOtp extends Document {
    phone: string;
    otpHash: string;
    expiresAt: Date;
    attempts: number;
    isVerified: boolean;
}

const otpSchema = new Schema<IOtp>(
    {
        phone: {
            type: String,
            required: true,
            index: true,
        },

        otpHash: {
            type: String,
            required: true,
        },

        expiresAt: {
            type: Date,
            required: true,
        },

        attempts: {
            type: Number,
            default: 0,
        },

        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Auto delete expired OTPs
otpSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
);

export default mongoose.model<IOtp>("Otp", otpSchema);