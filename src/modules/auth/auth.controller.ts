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

}

export default new AuthController();