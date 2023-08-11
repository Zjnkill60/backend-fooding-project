import { Module } from '@nestjs/common';
import { FlashsaleService } from './flashsale.service';
import { FlashsaleController } from './flashsale.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Flashsale, FlashsaleSchema } from './entities/flashsale.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Flashsale.name, schema: FlashsaleSchema }]), ProductModule],
  controllers: [FlashsaleController],
  providers: [FlashsaleService]
})
export class FlashsaleModule { }
