import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Order } from "src/orders/entities/order.entity";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {

    @Prop()
    name: string;

    @Prop()
    phoneNumber: string;

    @Prop()
    email: string;

    @Prop()
    isFirstTimeBuy: string;

    @Prop()
    password: string;

    @Prop()
    avatar: string;

    @Prop()
    role: string;

    @Prop()
    address: Object[];

    @Prop()
    refreshToken: string;

    @Prop({ type: mongoose.Schema.Types.Array, ref: Order.name })
    orderHistory: mongoose.Schema.Types.ObjectId[]

    @Prop({ type: mongoose.Schema.Types.Array, ref: Order.name })
    itemShipper: mongoose.Schema.Types.ObjectId[]
}

export const UserSchema = SchemaFactory.createForClass(User);
