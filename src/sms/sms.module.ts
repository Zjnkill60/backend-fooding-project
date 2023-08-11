import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SmsController } from './sms.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [SmsController],
  providers: [SmsService],
  imports: [UsersModule]
})
export class SmsModule { }
