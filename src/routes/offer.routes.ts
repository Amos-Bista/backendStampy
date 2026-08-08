import { Router } from "express";
import validateRequest from "../shared/middlewares/validateRequest";
import { createOfferSchema, updateOfferSchema } from "../modules/offers/offer.validation";
import offerController from "../modules/offers/offer.controller";
// import offerController from "../modules/offers/offer.controller";

// import offerController from "./offer.controller";
// import validateRequest from "../../shared/middlewares/validateRequest";

// import {
//     createOfferSchema,
//     updateOfferSchema,
// } from "./offer.validation";

const offerRouter = Router();

offerRouter.post(
    "/",
    validateRequest(createOfferSchema),
    offerController.createOffer
);

offerRouter.get(
    "/business/:businessId",
    offerController.getOffers
);

offerRouter.get(
    "/:id",
    offerController.getOffer
);

offerRouter.patch(
    "/:id",
    validateRequest(updateOfferSchema),
    offerController.updateOffer
);

offerRouter.delete(
    "/:id",
    offerController.deleteOffer
);

export default offerRouter;