import { Router } from "express";
import validateRequest from "../shared/middlewares/validateRequest";
import { createStampSchema } from "../modules/stamp/stamp.validation";
import stampController from "../modules/stamp/stamp.controller";
// import stampController from "./stamp.controller";
// import validateRequest from "../../shared/middlewares/validateRequest";
// import { createStampSchema } from "./stamp.validation";

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