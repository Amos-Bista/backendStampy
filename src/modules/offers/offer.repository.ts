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
        return Offer.find({ businessId }).sort({
            createdAt: -1,
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