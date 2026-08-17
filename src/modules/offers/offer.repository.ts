import Offer from "./offer.model.js";


// console.log("Offer =", Offer);
// console.log("typeof Offer =", typeof Offer);
// console.log("constructor =", (Offer as any)?.constructor?.name);
// console.log("create =", (Offer as any)?.create);

class OfferRepository {

    create(data: any) {
        return Offer.create(data);
    }
    findAllByBusiness(businessId: string) {
        console.log("=================================");
        console.log("MongoDB OFFER DEBUG");
        console.log("businessId received:", businessId);
        console.log("businessId type:", typeof businessId);

        return Offer.find({})
            .then((allOffers) => {
                console.log("TOTAL OFFERS IN DATABASE:", allOffers.length);

                console.log(
                    "ALL OFFER BUSINESS IDs:",
                    allOffers.map((offer) => ({
                        id: offer._id,
                        title: offer.title,
                        businessId: offer.businessId,
                        businessIdType: typeof offer.businessId,
                    }))
                );

                const matchingOffers = allOffers.filter(
                    (offer) =>
                        String(offer.businessId) ===
                        String(businessId)
                );

                console.log(
                    "MATCHING OFFERS:",
                    matchingOffers.map((offer) => ({
                        id: offer._id,
                        title: offer.title,
                        businessId: offer.businessId,
                    }))
                );

                console.log("=================================");

                return matchingOffers.sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                );
            });
    }

    findById(id: string) {
        return Offer.findById(id);
    }

    update(id: string, data: any) {
        return Offer.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
            }
        );
    }

    delete(id: string) {
        return Offer.findByIdAndUpdate(
            id,
            {
                isActive: false,
            },
            {
                new: true,
            }
        );
    }
}

export default new OfferRepository();