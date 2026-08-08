import jwt from "jsonwebtoken";

import otpService from "./otp.service";
import customerRepository from "../customer/customer.repository";

class AuthService {

    async sendOtp(phone: string) {
        // 1. Capture the generated OTP returned by otpService
        const otp = await otpService.send(phone);
        console.log("Generated OTP:", otp); // Log the generated OTP for debugging

        return {
            success: true,
            message: "OTP sent successfully.",
            otp, // 2. Send actual OTP in response (or under data: { otp })
        };
    }

    async verifyOtp(phone: string, otp: string) {

        const verified = await otpService.verify(
            phone,
            otp
        );

        if (!verified) {
            throw new Error("Invalid or expired OTP.");
        }

        let customer =
            await customerRepository.findByPhone(phone);

        if (!customer) {

            customer =
                await customerRepository.create({
                    phone,
                    isVerified: true,
                });

        } else {

            customer.isVerified = true;
            await customer.save();

        }

        const token = jwt.sign(
            {
                customerId: customer._id,
                phone: customer.phone,
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "30d",
            }
        );

        return {
            token,
            customer,
        };
    }
}

export default new AuthService();