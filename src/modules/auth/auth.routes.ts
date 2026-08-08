import { Router } from "express";

import authController from "./auth.controller";

// import validateRequest from "../../middlewares/validateRequest";

import {
    sendOtpSchema,
    verifyOtpSchema,
} from "./auth.validation";
import validateRequest from "../../shared/middlewares/validateRequest";


// console.log("Auth routes loaded");
const authrouter = Router();

authrouter.post(
    "/send-otp",
    validateRequest(sendOtpSchema),
    authController.sendOtp
);

authrouter.post(
    "/verify-otp",
    validateRequest(verifyOtpSchema),
    authController.verifyOtp
);

authrouter.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Auth route works",
    });
});

export default authrouter;