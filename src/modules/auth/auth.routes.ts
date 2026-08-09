import { Router } from "express";
import validateRequest from "../../shared/middlewares/validateRequest.js";
import { sendOtpSchema, verifyOtpSchema } from "./auth.validation.js";
import authController from "./auth.controller.js";


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