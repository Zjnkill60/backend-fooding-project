
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type DiscountDocument = HydratedDocument<Discount>;

@Schema({ timestamps: true })
export class Discount {


    @Prop()
    codeSeller: string

    @Prop()
    title: string

    @Prop()
    description: string

    @Prop()
    category: string

    @Prop()
    discount: number

    @Prop()
    priceApplicable: number


}

export const DiscountSchema = SchemaFactory.createForClass(Discount);

