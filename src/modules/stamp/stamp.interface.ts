import { Document, Types } from "mongoose";

export interface IStamp extends Document {

    customerId: Types.ObjectId;

    businessId: Types.ObjectId;

    offerId?: Types.ObjectId;

    qrCode?: string;

    status: "ACTIVE" | "REDEEMED";

    createdAt: Date;

    updatedAt: Date;
}