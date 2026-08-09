import { Router } from "express";
import validateRequest from "../shared/middlewares/validateRequest.js";
import { createStampSchema } from "../modules/stamp/stamp.validation.js";
import stampController from "../modules/stamp/stamp.controller.js";

const stampRouter = Router();

stampRouter.post(
    "/",
    validateRequest(createStampSchema),
    stampController.createStamp
);

stampRouter.post(
    "/claim/:businessId/:customerId/:offerId",
    validateRequest(createStampSchema),
    stampController.claimStamp
);

stampRouter.get(
    "/customer/:customerId",
    stampController.getCustomerStamps
);

stampRouter.get(
    "/business/:businessId",
    stampController.getBusinessStamps
);

stampRouter.get(
    "/customer/:customerId/count",
    stampController.getTotalStamps
);

export default stampRouter;