import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) { }


  async create(createProductDto: CreateProductDto) {
    let product = await this.productModel.create({ ...createProductDto })
    return {
      message: 'create a product',
      product
    }
  }

  async findAll(queryString) {
    let { filter, sort } = aqp(queryString)
    let { current, pageSize } = queryString
    delete filter.current
    delete filter.pageSize

    let totalItem = (await this.productModel.find({})).length

    //@ts-ignore
    let listProduct = await this.productModel.find(filter).limit(pageSize).skip((current - 1) * pageSize).sort(sort).populate('comments')
    return {
      message: 'fetch list product ',
      listProduct,
      totalItem
    }
  }

  async findOne(id: string) {
    let product = await this.productModel.findById({ _id: id }).populate('comments')
    return {
      message: 'find product by id',
      product
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    let productUpdate = await this.productModel.updateOne({ _id: id }, { $set: { ...updateProductDto } })
    return {
      message: 'update product',
      productUpdate
    }
  }

  async remove(id: string) {
    let productDelete = await this.productModel.deleteOne({ _id: id })
    return {
      message: "delete a product by id",
      productDelete
    }
  }

  async updateSoldProduct(listItem) {

    listItem?.map(async item => {
      let quantityOrder = +item.quantity
      let prod = await this.productModel.findOne({ mainText: item.name }).exec()
      if (prod.isFlashsale) {
        await this.productModel.updateOne({ mainText: item.name }, { $set: { sold: prod.sold += (quantityOrder), soldFlashSale: prod.soldFlashSale += quantityOrder } })
      } else {
        await this.productModel.updateOne({ mainText: item.name }, { $set: { sold: prod.sold += (quantityOrder) } })
      }

    });

  }

  async updatePropFlashSale(idItem: string, priceSale: number, quantity: number, soldFlashSale: number) {
    await this.productModel.updateOne({ _id: idItem }, { $set: { priceFlashSale: priceSale, quantity, soldFlashSale, isFlashsale: true } })

  }

  async removeItemFromFlashsale(idItem: string) {
    await this.productModel.updateOne({ _id: idItem }, { $set: { isFlashsale: false } })

  }

  async updateCommentToProduct(_id: string, commentID: any) {
    await this.productModel.updateOne({ _id }, { $push: { comments: commentID } })

  }
}
