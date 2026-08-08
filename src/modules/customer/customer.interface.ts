import { Document } from "mongoose";

export interface ICustomer extends Document {
    phone: string;
    fullName?: string;
    email?: string;
    profileImage?: string;

    totalStamp: number;

    isVerified: boolean;
    isBlocked: boolean;

    createdAt: Date;
    updatedAt: Date;
}