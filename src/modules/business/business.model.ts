import { Schema, model } from 'mongoose';
import {
    BusinessCategory,
    BusinessStatus,
    StampApprovalMode,
    SubscriptionPlan,
    SubscriptionStatus,
} from './business.enums';
import { IBusiness } from '../business/business.interface';

const AddressSchema = new Schema(
    {
        country: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        street: String,
        postalCode: String,
    },
    { _id: false },
);

const SubscriptionSchema = new Schema(
    {
        plan: {
            type: String,
            enum: Object.values(SubscriptionPlan),
            default: SubscriptionPlan.FREE,
        },
        status: {
            type: String,
            enum: Object.values(SubscriptionStatus),
            default: SubscriptionStatus.TRIAL,
        },
        startsAt: Date,
        expiresAt: Date,
    },
    { _id: false },
);

const SettingsSchema = new Schema(
    {
        enableOTP: { type: Boolean, default: true },
        enableQRCode: { type: Boolean, default: true },
        enableNotifications: { type: Boolean, default: true },
        allowMultipleCampaigns: { type: Boolean, default: false },
        allowReferral: { type: Boolean, default: false },
        stampApprovalMode: {
            type: String,
            enum: Object.values(StampApprovalMode),
            default: StampApprovalMode.MANUAL,
        },
    },
    { _id: false },
);

const StatisticsSchema = new Schema(
    {
        totalCustomers: { type: Number, default: 0 },
        totalEmployees: { type: Number, default: 0 },
        totalCampaigns: { type: Number, default: 0 },
        totalStampClaims: { type: Number, default: 0 },
        totalRewardsRedeemed: { type: Number, default: 0 },
    },
    { _id: false },
);

const BusinessSchema = new Schema<IBusiness>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        description: String,

        category: {
            type: String,
            enum: Object.values(BusinessCategory),
            // required: true,
        },

        ownerName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        phone: {
            type: String,
            required: true,
            unique: true,
        },

        website: String,

        logo: String,

        coverImage: String,

        primaryColor: String,

        secondaryColor: String,

        address: {
            type: AddressSchema,
            required: true,
        },

        subscription: {
            type: SubscriptionSchema,
            default: {},
        },

        settings: {
            type: SettingsSchema,
            default: {},
        },

        statistics: {
            type: StatisticsSchema,
            default: {},
        },

        status: {
            type: String,
            enum: Object.values(BusinessStatus),
            default: BusinessStatus.ACTIVE,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

// BusinessSchema.index({ slug: 1 }, { unique: true });
// BusinessSchema.index({ email: 1 }, { unique: true });
// BusinessSchema.index({ phone: 1 }, { unique: true });

export default model<IBusiness>('Business', BusinessSchema);