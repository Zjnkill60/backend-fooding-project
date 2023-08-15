import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from 'src/comments/entities/comment.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { DISCOUNT_ARRAY, PRODUCT_ARRAY, USER_ARRAY } from './constant';
import { Discount } from 'src/discount/entities/discount.entity';
import { Flashsale } from 'src/flashsale/entities/flashsale.entity';

@Injectable()
export class DatabseService implements OnModuleInit {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Product.name) private productModel: Model<Product>,
        @InjectModel(Order.name) private orderModel: Model<Order>,
        @InjectModel(Comment.name) private commentModel: Model<Comment>,
        @InjectModel(Discount.name) private discountModel: Model<Discount>,
        @InjectModel(Flashsale.name) private Flashsale: Model<Flashsale>,

    ) { }

    async onModuleInit(): Promise<void> {
        let countUser = await this.userModel.find({}).count()
        if (countUser == 0) {
            await this.userModel.insertMany(USER_ARRAY)
        }

        let countProduct = await this.productModel.find({}).count()
        if (countProduct == 0) {
            await this.productModel.insertMany(PRODUCT_ARRAY)
        }

        let countDiscount = await this.discountModel.find({}).count()
        if (countDiscount == 0) {
            await this.discountModel.insertMany(DISCOUNT_ARRAY)
        }

        let countFlashsale = await this.Flashsale.find({}).count()
        if (countFlashsale == 0) {
            var today = new Date();
            await this.Flashsale.create({ timer: today.toString() })
        }

    }
}
