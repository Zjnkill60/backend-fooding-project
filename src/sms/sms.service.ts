import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Twilio } from 'twilio';

@Injectable()
export class SmsService {
    constructor(private usersService: UsersService) { }

    private twilioClient: Twilio = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

    async sendOTP(phoneNumber: string) {
        let msg = ''
        let phoneNumberExist = await this.usersService.findOne(phoneNumber)

        if (phoneNumberExist) {
            throw new BadRequestException("Số điện thoại đã tồn tại !")
        } else {
            try {
                await this.twilioClient.verify.v2.services(process.env.TWILIO_SERVICE_ID).verifications
                    .create({ to: phoneNumber, channel: 'sms' })
                    .then((verfication) => (msg = verfication.status))

                return {
                    message: 'send sms',
                    msg
                }
            } catch (error) {
                throw new BadRequestException(error)
            }
        }

    }

    async verifyOTP(phoneNumber: string, otp: string) {
        let msg = ''
        try {
            await this.twilioClient.verify.v2.services(process.env.TWILIO_SERVICE_ID).verificationChecks
                .create({ to: phoneNumber, code: otp })
                .then((verfication) => (msg = verfication.status))


            return {
                message: 'verify sms',
                msg
            }
        } catch (error) {

            throw new BadRequestException(error)
        }

    }


}
