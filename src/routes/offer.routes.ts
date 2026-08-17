import { Router } from "express";
import validateRequest from "../shared/middlewares/validateRequest.js";
import {
    createOfferSchema,
    updateOfferSchema,
} from "../modules/offers/offer.validation.js";
import offerController from "../modules/offers/offer.controller.js";
import authenticate from "../shared/middlewares/auth.middleware.js";

const offerRouter = Router();


// Create offer
offerRouter.post(
    "/",
    authenticate,
    validateRequest(createOfferSchema),
    offerController.createOffer
);


// Get offers belonging to logged-in business
offerRouter.get(
    "/business",
    authenticate,
    offerController.getOffers
);


// Get single offer
offerRouter.get(
    "/:id",
    authenticate,
    offerController.getOffer
);


// Update offer
offerRouter.patch(
    "/:id",
    authenticate,
    validateRequest(updateOfferSchema),
    offerController.updateOffer
);


// Delete offer
offerRouter.delete(
    "/:id",
    authenticate,
    offerController.deleteOffer
);


export default offerRouter;