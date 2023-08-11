import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment {


    @Prop()
    rate: number

    @Prop()
    description: string

    @Prop()
    image: string[]

    @Prop()
    name: string

    @Prop()
    avatar: string

    @Prop()
    productID: string






}

export const CommentSchema = SchemaFactory.createForClass(Comment);

