class SmsService {

    // constructor() {
    //     console.log("SmsService constructor");
    // }

    async sendOtp(phone: string, otp: string) {

        console.log(`
=========================
STAMPY OTP

Phone : ${phone}

OTP : ${otp}

=========================
`);

        return true;
    }
}

export default new SmsService();