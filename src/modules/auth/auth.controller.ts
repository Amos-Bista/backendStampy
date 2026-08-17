import { Request, Response } from "express";
import authService from "./auth.service.js";


class AuthController {

    async sendOtp(
        req: Request,
        res: Response
    ) {

        const result =
            await authService.sendOtp(
                req.body.phone
            );

        return res.status(200).json(result);
    }

    async verifyOtp(
        req: Request,
        res: Response
    ) {

        const result =
            await authService.verifyOtp(
                req.body.phone,
                req.body.otp
            );

        return res.status(200).json(result);
    }


    async businessLogin(
        req: Request,
        res: Response
    ) {
        try {

            const {
                identifier,
                password,
            } = req.body;

            console.log("LOGIN IDENTIFIER:", identifier);
            console.log("LOGIN PASSWORD PROVIDED:", password);

            const result =
                await authService.businessLogin(
                    identifier,
                    password
                );

            return res.status(200).json({
                success: true,
                message: "Business login successful",
                data: {
                    business: result.business,
                },
                token: result.token,
            });

        } catch (error: any) {

            console.error(
                "Business login error:",
                error
            );

            return res.status(401).json({
                success: false,
                message:
                    error.message ||
                    "Invalid credentials",
            });
        }
    }

}

export default new AuthController();