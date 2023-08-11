import { Body, Controller, Post } from '@nestjs/common';
import { SmsService } from './sms.service';
import { phoneNumberSend } from './sms.dto.validatePhone';

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) { }

  @Post('/send-otp')
  sendOTP(@Body() data: phoneNumberSend) {
    let prefix = '+84'
    let phone = prefix.concat(data.phoneNumber)
    return this.smsService.sendOTP(phone)
  }

  @Post('/verify-otp')
  verifyOTP(@Body() data: { phoneNumber: string, otp: string }) {
    let prefix = '+84'
    let phone = prefix.concat(data.phoneNumber)
    return this.smsService.verifyOTP(phone, data.otp)
  }

}
