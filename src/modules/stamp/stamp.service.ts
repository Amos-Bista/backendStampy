// import stampRepository from "./stamp.repository";

import stampRepository from "./stamp.repository";


// console.log("🔥 STAMP SERVICE LOADED");
class StampService {

    async claimStamp(data: { customerId: string; businessId: string; offerId: string }) {
        // 🟢 Check if a stamp was claimed for this exact offer in the last 5 seconds
        const recentStamp = await stampRepository.findRecentStamp({
            customerId: data.customerId,
            offerId: data.offerId,
            secondsWindow: 5,
        });

        if (recentStamp) {
            console.log("⚠️ Blocked rapid duplicate stamp claim");
            return recentStamp; // Return existing stamp instead of creating a second one
        }

        return stampRepository.create({
            customerId: data.customerId,
            businessId: data.businessId,
            offerId: data.offerId,
            claimedAt: new Date(),
        });
    }

    createStamp(data: any) {
        return stampRepository.create(data);
    }

    getCustomerStamps(customerId: string) {
        return stampRepository.findByCustomer(customerId);
    }

    getBusinessStamps(businessId: string) {
        return stampRepository.findByBusiness(businessId);
    }

    getTotalStamps(customerId: string) {
        return stampRepository.countCustomerStamps(customerId);
    }

    redeemStamps(customerId: string, count: number) {
        return stampRepository.redeem(customerId, count);
    }
}

export default new StampService();