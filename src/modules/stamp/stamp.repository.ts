import Stamp from "./stamp.model.js";

console.log("📦 stamp.repository loaded");

class StampRepository {

    /**
     * Create a new stamp record for a customer, business, and offer
     */
    async create(data: { customerId: string; businessId: string; offerId: string;[key: string]: any }) {
        return await Stamp.create(data);
    }

    /**
     * Get all active stamps for a customer, populating Offer and Business details
     */
    async findByCustomer(customerId: string) {
        return await Stamp.find({ customerId, status: "ACTIVE" })
            .populate("offerId")
            .populate("businessId", "businessName name")
            .sort({ createdAt: -1 })
            .exec();
    }

    /**
     * Get all stamps recorded for a specific business
     */
    async findByBusiness(businessId: string) {
        return await Stamp.find({ businessId })
            .populate("offerId")
            .sort({ createdAt: -1 })
            .exec();
    }

    /**
     * Count active stamps for a specific customer
     */
    async countCustomerStamps(customerId: string) {
        return await Stamp.countDocuments({
            customerId,
            status: "ACTIVE",
        });
    }

    /**
     * Count active stamps for a specific customer on a specific offer
     */
    async countCustomerStampsByOffer(customerId: string, offerId: string) {
        return await Stamp.countDocuments({
            customerId,
            offerId,
            status: "ACTIVE",
        });
    }

    /**
     * Redeem active stamps for a customer on a specific offer
     */
    async redeemByOffer(customerId: string, offerId: string, count: number) {
        const stamps = await Stamp.find({
            customerId,
            offerId,
            status: "ACTIVE",
        })
            .sort({ createdAt: 1 })
            .limit(count);

        const ids = stamps.map((stamp) => stamp._id);

        return await Stamp.updateMany(
            { _id: { $in: ids } },
            { status: "REDEEMED", redeemedAt: new Date() }
        );
    }

    /**
     * Redeem any active stamps for a customer (generic fallback)
     */
    async redeem(customerId: string, count: number) {
        const stamps = await Stamp.find({
            customerId,
            status: "ACTIVE",
        })
            .sort({ createdAt: 1 })
            .limit(count);

        const ids = stamps.map((stamp) => stamp._id);

        return await Stamp.updateMany(
            { _id: { $in: ids } },
            { status: "REDEEMED", redeemedAt: new Date() }
        );
    }

    async findRecentStamp({ customerId, offerId, secondsWindow }: { customerId: string; offerId: string; secondsWindow: number }) {
        const timeLimit = new Date(Date.now() - secondsWindow * 1000);
        return await Stamp.findOne({
            customerId,
            offerId,
            createdAt: { $gte: timeLimit },
        });
    }
}

export default new StampRepository();