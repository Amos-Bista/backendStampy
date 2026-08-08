// import Otp from "./otp.model";

import otpModel from "./otp.model";

class OtpRepository {

    create(data: any) {
        return otpModel.create(data);
    }

    findLatest(phone: string) {
        return otpModel.findOne({ phone }).sort({
            createdAt: -1,
        });
    }

    deleteByPhone(phone: string) {
        return otpModel.deleteMany({ phone });
    }

    markVerified(id: string) {
        return otpModel.findByIdAndUpdate(
            id,
            {
                isVerified: true,
            },
            {
                new: true,
            }
        );
    }

    increaseAttempt(id: string) {
        return otpModel.findByIdAndUpdate(
            id,
            {
                $inc: {
                    attempts: 1,
                },
            },
            {
                new: true,
            }
        );
    }
}

export default new OtpRepository();