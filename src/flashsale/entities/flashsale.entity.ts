import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/product/entities/product.entity';

export type FlashsaleDocument = HydratedDocument<Flashsale>;

@Schema({ timestamps: true })
export class Flashsale {


    @Prop()
    timer: string


    @Prop({ type: mongoose.Schema.Types.Array, ref: Product.name })
    itemFlashSale: mongoose.Schema.Types.ObjectId[]





}

export const FlashsaleSchema = SchemaFactory.createForClass(Flashsale);

