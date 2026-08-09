import mongoose, { Schema } from "mongoose";
import { IOffer } from "./offer.interface.js";

// console.log("📦 offer.model.ts loaded");



const offerSchema = new Schema<IOffer>(
    {
        businessId: {
            type: Schema.Types.ObjectId,
            ref: "Business",
            required: true,
            index: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
            trim: true,
        },

        image: {
            type: String,
            default: "",
        },

        requiredStamps: {
            type: Number,
            required: true,
            min: 1,
        },

        expiryDate: {
            type: Date,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// const OfferModel = mongoose.model<IOffer>("Offer", offerSchema);

// console.log("OfferModel:", OfferModel);
// console.log("OfferModel.create:", (OfferModel as any).create);


export default mongoose.model<IOffer>("Offer", offerSchema);