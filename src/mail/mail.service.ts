import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from 'src/orders/entities/order.entity';
import { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class MailService {
    constructor(private readonly mailService: MailerService,
        @InjectModel(Order.name) private orderModel: Model<Order>
    ) { }


    handleSendEmail = async (orderID: any, status) => {
        let order = await this.orderModel.findById({ _id: orderID })
        //@ts-ignore
        let orderItem = order?.item.map(item => {
            return {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                thumbnail: `http://bansachdao.xyz:8088/images/${item.thumbnail}`

            }
        })

        console.log(orderItem)
        if (status == "Chờ xác nhận") {
            await this.mailService.sendMail({
                to: `${order?.email}`,
                from: '"BOOKSTORE.COM" <noreply@example.com>', // override default from
                subject: `Thông báo xác nhận đơn hàng #${order._id}`,
                template: 'view',
                context: {
                    orderName: order.name,
                    orderID: order._id,
                    orderAddress: order.address,
                    orderPhoneNumber: order.phoneNumber,
                    orderItem,
                    orderPrice: order.totalPrice



                }
            });
            return
        }

        if (status == "Xác nhận thành công") {
            await this.mailService.sendMail({
                to: `${order?.email}`,
                from: '"BOOKSTORE.COM" <noreply@example.com>', // override default from
                subject: `Xác nhận đơn hàng thành công #${order._id}`,
                template: 'view',
                context: {
                    orderName: order.name,
                    orderID: order._id,
                    orderAddress: order.address,
                    orderPhoneNumber: order.phoneNumber,
                    orderItem,
                    orderPrice: order.totalPrice



                }
            });
            return
        }

        if (status == "Hoàn tất") {
            await this.mailService.sendMail({
                to: `${order?.email}`,
                from: '"BOOKSTORE.COM" <noreply@example.com>', // override default from
                subject: `Thông báo đơn hàng đã được giao thành công`,
                html: '<b>Cảm ơn quý khách đã mua hàng tại BOOKSTORE , chúc quý khách có ngày mới tốt lành</b>',
            });
            return
        }




    }
}
