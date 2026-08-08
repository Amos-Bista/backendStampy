import mongoose, { Schema } from "mongoose";
import { IStamp } from "./stamp.interface";

const stampSchema = new Schema<IStamp>(
    {
        customerId: {
            type: Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
            index: true,
        },

        businessId: {
            type: Schema.Types.ObjectId,
            ref: "Business",
            required: true,
            index: true,
        },

        offerId: {
            type: Schema.Types.ObjectId,
            ref: "Offer",
        },

        qrCode: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: ["ACTIVE", "REDEEMED"],
            default: "ACTIVE",
        },
    },
    {
        timestamps: true,
    }
);

const Stamp = mongoose.model<IStamp>(
    "Stamp",
    stampSchema
);


console.log("Stamp =", Stamp);
console.log("Stamp.create =", Stamp.create);

export default Stamp;