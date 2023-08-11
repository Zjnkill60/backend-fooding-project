import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { ProductModule } from './product/product.module';
import { CommentsModule } from './comments/comments.module';
import { OrdersModule } from './orders/orders.module';
import { MailModule } from './mail/mail.module';
import { DatabseModule } from './database/databse.module';
import { SmsModule } from './sms/sms.module';
import { FlashsaleModule } from './flashsale/flashsale.module';
import { DiscountModule } from './discount/discount.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  MongooseModule.forRootAsync({
    useFactory: () => ({
      uri: process.env.URL_DB,
    }),
  }),
    UsersModule,
    AuthModule,
    FileModule,
    ProductModule,
    CommentsModule,
    OrdersModule,
    MailModule,
    DatabseModule,
    SmsModule,
    FlashsaleModule,
    DiscountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
