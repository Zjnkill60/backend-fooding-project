import { Injectable } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Discount } from './entities/discount.entity';
import { Model } from 'mongoose';

@Injectable()
export class DiscountService {
  constructor(@InjectModel(Discount.name) private discountModel: Model<Discount>) { }

  async create(createDiscountDto: CreateDiscountDto) {
    let newDiscount = await this.discountModel.create({ ...createDiscountDto })
    return {
      message: "Create new discount",
      newDiscount
    }
  }

  async findAll() {
    let listDiscount = await this.discountModel.find({})
    return {
      message: "find all code seller",
      listDiscount
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} discount`;
  }

  update(id: number, updateDiscountDto: UpdateDiscountDto) {
    return `This action updates a #${id} discount`;
  }

  remove(id: number) {
    return `This action removes a #${id} discount`;
  }
}
