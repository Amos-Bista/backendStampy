import bcrypt from "bcrypt";
import otpRepository from "./otp.repository.js";
import smsService from "./sms.service.js";

class OtpService {

    async send(phone: string) {

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        const otpHash = await bcrypt.hash(
            otp,
            10
        );

        // await otpRepository.deleteByPhone(phone);

        await otpRepository.create({
            phone,
            otpHash,
            expiresAt: new Date(
                Date.now() + 5 * 60 * 1000
            ),
        });

        await smsService.sendOtp(
            phone,
            otp
        );
        return otp;
    }

    async verify(
        phone: string,
        otp: string
    ) {

        const record =
            await otpRepository.findLatest(phone);

        if (!record)
            return false;

        if (record.expiresAt < new Date())
            return false;

        if (record.attempts >= 5)
            return false;

        const matched =
            await bcrypt.compare(
                otp,
                record.otpHash
            );

        if (!matched) {

            await otpRepository.increaseAttempt(
                record.id
            );

            return false;
        }

        await otpRepository.markVerified(
            record.id
        );

        return true;
    }
}

export default new OtpService();