import offerRepository from "./offer.repository";

// console.log("🔥 OFFER SERVICE LOADED");


class OfferService {

    createOffer(data: any) {
        return offerRepository.create(data);
    }

    getOffers(businessId: string) {
        return offerRepository.findAllByBusiness(businessId);
    }

    getOffer(id: string) {
        return offerRepository.findById(id);
    }

    updateOffer(id: string, data: any) {
        return offerRepository.update(id, data);
    }

    deleteOffer(id: string) {
        return offerRepository.delete(id);
    }
}

export default new OfferService();