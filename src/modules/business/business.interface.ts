import { Document } from 'mongoose';
import {
    BusinessCategory,
    BusinessStatus,
    StampApprovalMode,
    SubscriptionPlan,
    SubscriptionStatus,
} from '../business/business.enums';

export interface IAddress {
    country: string;
    state: string;
    city: string;
    street?: string;
    postalCode?: string;
}

export interface ISubscription {
    plan: SubscriptionPlan;
    status: SubscriptionStatus;
    startsAt?: Date;
    expiresAt?: Date;
}

export interface IBusinessSettings {
    enableOTP: boolean;
    enableQRCode: boolean;
    enableNotifications: boolean;
    allowMultipleCampaigns: boolean;
    allowReferral: boolean;
    stampApprovalMode: StampApprovalMode;
}

export interface IBusinessStatistics {
    totalCustomers: number;
    totalEmployees: number;
    totalCampaigns: number;
    totalStampClaims: number;
    totalRewardsRedeemed: number;
}

export interface IBusiness extends Document {
    name: string;
    slug: string;
    description?: string;

    category?: BusinessCategory;

    ownerName: string;

    email: string;

    phone: string;

    website?: string;

    logo?: string;

    coverImage?: string;

    primaryColor?: string;

    secondaryColor?: string;

    address: IAddress;

    subscription: ISubscription;

    settings: IBusinessSettings;

    statistics: IBusinessStatistics;

    status: BusinessStatus;

    createdAt: Date;
    updatedAt: Date;
}