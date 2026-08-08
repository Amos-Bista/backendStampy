import { Router } from "express";
import customerController from "../modules/customer/customer.controller";
// import customerController from "./customer.controller";
// import validateRequest from "../../middlewares/validateRequest";
// import { createCustomerSchema, updateCustomerSchema } from "./customer.validation";

const CustomerRouter = Router();

CustomerRouter.post(
    "/",
    // validateRequest(createCustomerSchema),
    customerController.create
);

CustomerRouter.get(
    "/allCustomers",
    customerController.getAll
);

CustomerRouter.get(
    "/:id",
    customerController.getOne
);

CustomerRouter.patch(
    "/:id",
    // validateRequest(updateCustomerSchema),
    customerController.update
);

CustomerRouter.delete(
    "/:id",
    customerController.delete
);

export default CustomerRouter;