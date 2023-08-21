import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/entities/user.entity';


export type OrderDocument = HydratedDocument<Order>;
@Schema({ timestamps: true })

export class Order {
    @Prop()
    orderCode: string

    @Prop()
    name: string

    @Prop()
    email: string

    @Prop()
    phoneNumber: string

    @Prop()
    status: string

    @Prop()
    totalPrice: number

    @Prop()
    address: string

    // now or calendar
    @Prop()
    date: string


    //banking or cash
    @Prop()
    payments: string

    @Prop()
    time: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    shipper: mongoose.Schema.Types.ObjectId

    @Prop({ type: mongoose.Schema.Types.Array })
    item: mongoose.Schema.Types.Array

    @Prop()
    reasonReject: string

    @Prop()
    cash: string

    @Prop()
    isPayment: string


}

export const OrderSchema = SchemaFactory.createForClass(Order);

