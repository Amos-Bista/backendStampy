import { Schema, model } from "mongoose";
import { ICustomer } from "./customer.interface.js";

const customerSchema = new Schema<ICustomer>(
    {
        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        fullName: {
            type: String,
            default: "",
            trim: true,
        },

        email: {
            type: String,
            default: "",
            lowercase: true,
        },

        profileImage: {
            type: String,
            default: "",
        },

        totalStamp: {
            type: Number,
            default: 0,
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        isBlocked: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default model<ICustomer>("Customer", customerSchema);