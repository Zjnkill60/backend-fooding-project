import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Comment } from 'src/comments/entities/comment.entity';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {


    @Prop()
    author: string

    @Prop()
    mainText: string

    @Prop()
    category: string

    @Prop()
    price: number

    @Prop()
    percentSale: number

    @Prop()
    sold: number

    @Prop()
    quantity: number

    @Prop()
    thumbnail: string

    @Prop()
    slider: string[]

    @Prop({ type: mongoose.Schema.Types.Array, ref: Comment.name })
    comments: mongoose.Schema.Types.ObjectId[]

    @Prop()
    isFlashsale: boolean

    @Prop()
    priceFlashSale: number

    @Prop()
    soldFlashSale: number



}

export const ProductSchema = SchemaFactory.createForClass(Product);

