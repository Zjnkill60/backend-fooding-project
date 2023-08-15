import { Module } from '@nestjs/common';
import { DatabseService } from './databse.service';
import { DatabseController } from './databse.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { Product, ProductSchema } from 'src/product/entities/product.entity';
import { Order, OrderSchema } from 'src/orders/entities/order.entity';
import { Comment, CommentSchema } from 'src/comments/entities/comment.entity';
import { Discount, DiscountSchema } from 'src/discount/entities/discount.entity';
import { Flashsale, FlashsaleSchema } from 'src/flashsale/entities/flashsale.entity';

@Module({
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: Product.name, schema: ProductSchema },
    { name: Order.name, schema: OrderSchema },
    { name: Comment.name, schema: CommentSchema },
    { name: Discount.name, schema: DiscountSchema },
    { name: Flashsale.name, schema: FlashsaleSchema },
  ])],
  controllers: [DatabseController],
  providers: [DatabseService]
})
export class DatabseModule { }
