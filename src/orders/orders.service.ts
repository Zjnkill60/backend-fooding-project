import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './entities/order.entity';
import { ProductService } from 'src/product/product.service';
import { UsersService } from 'src/users/users.service';
import aqp from 'api-query-params';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>,
    private userService: UsersService,
    private mailService: MailService,
    private productService: ProductService

  ) { }
  async create(createOrderDto: CreateOrderDto) {
    let { status, shipper, idPerson } = createOrderDto
    let order = await this.orderModel.create({ ...createOrderDto })
    if (idPerson) {
      await this.userService.updateOrderHistoryUser(idPerson, order._id)
    }
    if (shipper != null) {
      await this.userService.updateItemShipper(shipper, order._id)
    }
    await this.productService.updateSoldProduct(createOrderDto.item)
    await this.mailService.handleSendEmail(order._id, status)

    return {
      message: 'create new order',
      order
    }
  }
  async findAll(queryString) {
    let { filter, sort } = aqp(queryString)
    let { current, pageSize } = queryString
    delete filter.current
    delete filter.pageSize
    let totalOrder = (await this.orderModel.find({})).length

    let totalOrderFind = (await this.orderModel.find(filter)).length
    //@ts-ignore

    let listOrder = await this.orderModel.find(filter).limit(pageSize).skip((current - 1) * pageSize).sort(sort).populate("shipper")
    return {
      message: "Fetch list order paginate",
      listOrder,
      totalOrder,
      totalOrderFind
    }
  }

  async getLengthOrder() {

    let lengthAll = (await this.orderModel.find({})).length
    let lengthPending = (await this.orderModel.find({ status: "Chờ xác nhận" })).length
    let lengthRunning = (await this.orderModel.find({ status: "Xác nhận thành công" })).length
    let lengthDone = (await this.orderModel.find({ status: "Hoàn tất" })).length
    let lengthReject = (await this.orderModel.find({ status: "Từ chối" })).length
    return {
      message: "Length order by status",
      lengthOrder: {
        lengthAll,
        lengthPending,
        lengthRunning,
        lengthDone,
        lengthReject
      }
    }
  }


  async getLengthOrderForShipper(idShipper: string) {

    let lengthRunning = (await this.orderModel.find({ status: "Đang giao", shipper: idShipper })).length
    let lengthDone = (await this.orderModel.find({ status: "Hoàn tất", shipper: idShipper })).length
    let lengthReject = (await this.orderModel.find({ status: "Từ chối", shipper: idShipper })).length
    return {
      message: "Length order by status",
      lengthOrder: {
        lengthRunning,
        lengthDone,
        lengthReject
      }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    let { shipper } = updateOrderDto

    let order = await this.orderModel.updateOne({ _id: id }, { $set: { ...updateOrderDto } })
    await this.userService.updateItemShipper(shipper, id)

    await this.mailService.handleSendEmail(id, updateOrderDto?.status)
    return {
      message: "update an order by id",
      order
    }
  }

  async remove(id: number) {
    try {
      let order = await this.orderModel.deleteOne({ _id: id })
      return {
        message: "delete a user by id",
        order
      }
    } catch (err) {
      throw new BadRequestException("Id is correct ?")
    }
  }
}
