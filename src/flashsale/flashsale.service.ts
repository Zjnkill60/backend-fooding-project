import { Injectable } from '@nestjs/common';
import { CreateFlashsaleDto } from './dto/create-flashsale.dto';
import { UpdateFlashsaleDto } from './dto/update-flashsale.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Flashsale } from './entities/flashsale.entity';
import { Model } from 'mongoose';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class FlashsaleService {
  constructor(@InjectModel(Flashsale.name) private flashsaleModel: Model<Flashsale>,
    private productService: ProductService

  ) { }
  async create(createFlashsaleDto: CreateFlashsaleDto) {
    let modelFlashsale = await this.flashsaleModel.create({ ...createFlashsaleDto })
    return {
      message: "Create module flashsale",
      modelFlashsale
    }
  }

  async findAll() {
    let modelFlashsale = await this.flashsaleModel.find({}).populate("itemFlashSale")
    return {
      message: "find all flashsale",
      modelFlashsale
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} flashsale`;
  }

  async createNewItem(id: string, updateFlashsaleDto: UpdateFlashsaleDto) {
    let modelFlashsale = await this.flashsaleModel.updateOne({ _id: id }, { $push: { itemFlashSale: updateFlashsaleDto.idItem } })
    await this.productService.updatePropFlashSale(updateFlashsaleDto.idItem, updateFlashsaleDto.priceSale, updateFlashsaleDto.quantity)
    return {
      message: "update flashsale",
      modelFlashsale
    }
  }

  async update(updateFlashsaleDto: UpdateFlashsaleDto) {
    let dataUpdate = await this.productService.updatePropFlashSale(updateFlashsaleDto.idItem, updateFlashsaleDto.priceSale, updateFlashsaleDto.quantity)
    return {
      message: "update flashsale",
      dataUpdate
    }
  }

  async updateTimer(id: string, data: { timer: string }) {
    let modelFlashsale = await this.flashsaleModel.updateOne({ _id: id }, { $set: { timer: data.timer } })
    return {
      message: "update timer flashsale",
      modelFlashsale
    }
  }

  async remove(id: string, data: any) {
    console.log(data.idItem)
    let modelFlashsale = await this.flashsaleModel.updateOne({ _id: id }, { $pull: { itemFlashSale: data.idItem } })

    return {
      messgae: "Delete a item",
      modelFlashsale
    }
  }
}
