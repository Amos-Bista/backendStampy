import { Document, Types } from "mongoose";

export interface IOffer extends Document {
    businessId: Types.ObjectId;

    title: string;

    description: string;

    image: string;

    requiredStamps: number;

    expiryDate?: Date;

    isActive: boolean;

    createdAt: Date;

    updatedAt: Date;
}