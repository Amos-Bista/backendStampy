import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import otpService from "./otp.service.js";
import customerRepository from "../customer/customer.repository.js";
import businessRepository from "../business/business.repository.js";


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


    async businessLogin(
        identifier: string,
        password: string
    ) {

        console.log("LOGIN IDENTIFIER:", identifier);
        console.log("LOGIN PASSWORD PROVIDED:", password);
        const business =
            await businessRepository.findByEmailOrPhone(
                identifier
            );
        console.log("BUSINESS FOUND:", !!business);

        if (!business) {
            throw new Error("Invalid email/phone or password");
        }
        console.log("BUSINESS EMAIL:", business.email);
        console.log("BUSINESS STATUS:", business.status);
        console.log("PASSWORD EXISTS:", !!business.password);
        console.log("PASSWORD PREFIX:", business.password?.substring(0, 7));

        const isPasswordValid =
            await bcrypt.compare(
                password,
                business.password
            );

        if (!isPasswordValid) {
            throw new Error("Invalid email/phone or password");
        }

        if (business.status !== "ACTIVE") {
            throw new Error(
                "Business account is not active"
            );
        }

        const token = jwt.sign(
            {
                id: business._id.toString(),
                businessId: business._id.toString(),
                role: "BUSINESS",
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "7d",
            }
        );

        const businessData =
            business.toObject();

        // delete businessData.password;

        return {
            token,
            business: businessData,
        };
    }
}

export default new AuthService();