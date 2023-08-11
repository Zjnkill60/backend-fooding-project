import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, GoogleUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as  passwordHash from 'password-hash';
import aqp from 'api-query-params';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto) {
    let userExist = await this.userModel.findOne({ phoneNumber: createUserDto.phoneNumber })
    if (userExist) {
      throw new BadRequestException("Số Điện Thoại đã tồn tại trong hệ thống !")
    }
    let hashPassword = this.genarateHashPassword(createUserDto.password)
    let user = await this.userModel.create({ ...createUserDto, password: hashPassword, avatar: 'avatar-user.png' })
    return {
      message: 'create new user',
      user
    };
  }

  async register(registerUserDto: RegisterUserDto) {
    let userExist = await this.userModel.findOne({ phoneNumber: registerUserDto.phoneNumber })
    if (userExist) {
      throw new BadRequestException("Số Điện Thoại đã tồn tại trong hệ thống !")
    } else {
      let hashPassword = this.genarateHashPassword(registerUserDto.password)
      let user = await this.userModel.create({ ...registerUserDto, password: hashPassword, avatar: 'avatar-user.png', role: "USER" })
      return user
    }
  }

  async registerUserGoogle(google: GoogleUserDto) {
    let userExist = await this.userModel.findOne({ email: google.email }).exec()

    if (userExist) {
      return { user: userExist, exist: true }
    } else {
      if (google?.phoneNumber) {
        let user = await this.userModel.create({ ...google, avatar: google.imageUrl, role: "USER" })
        return { user, exist: false }
      } else {
        return null;
      }
    }
  }

  async findAll(queryString) {
    let { filter, sort } = aqp(queryString)
    let { current, pageSize } = queryString
    delete filter.current
    delete filter.pageSize

    let totalUser = (await this.userModel.find({})).length
    //@ts-ignore
    let listUser = await this.userModel.find(filter).limit(+pageSize).skip((current - 1) * pageSize).sort(sort).populate(['orderHistory', 'itemShipper'])
    return {
      message: "Fetch list user paginate",
      listUser,
      totalUser
    }
  }

  async findOne(phoneNumber: string) {
    let converPhoneNumber = phoneNumber.slice(3, phoneNumber.length)
    let user = await this.userModel.findOne({ phoneNumber: converPhoneNumber }).exec()

    return user
  }


  async findOneById(id: string) {
    let user = await this.userModel.findOne({ _id: id }).populate(['orderHistory', 'itemShipper']).exec()

    return {
      message: "find one by id",
      user
    }
  }

  async findPhoneNumberLogin(phoneNumber: string) {
    let user = await this.userModel.findOne({ phoneNumber }).exec()

    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let user = await this.userModel.updateOne({ _id: id }, { $set: { role: updateUserDto.role } })
    return {
      message: 'update role user',
      user
    }
  }

  async updateInfoUser(id: string, updateUserDto: UpdateUserDto) {
    const { currentPassword, newPassword, confirmNewPassword } = updateUserDto

    if (currentPassword) {
      let userExist = await this.userModel.findById({ _id: id })
      if (this.verifyHashPassword(currentPassword, userExist.password)) {
        let hashPassword = this.genarateHashPassword(confirmNewPassword)
        let user = await this.userModel.updateOne({ _id: id }, { $set: { ...updateUserDto, password: hashPassword } })
        return {
          message: 'update info user',
          user
        }
      } else {
        throw new BadRequestException("Mật khẩu cũ không chính xác")
      }
    } else {
      let user = await this.userModel.updateOne({ _id: id }, { $set: { ...updateUserDto } })
      return {
        message: 'update info user',
        user
      }
    }

  }

  async remove(id: string) {
    let user = await this.userModel.deleteOne({ _id: id })
    return {
      message: 'update role user',
      user
    }
  }


  genarateHashPassword = (password: string) => {
    return passwordHash.generate(password)
  }


  verifyHashPassword = (password: string, hashPassword: string) => {
    return passwordHash.verify(password, hashPassword)
  }

  updateRefreshToken = async (phoneNumber: string, refreshToken: string) => {
    await this.userModel.updateOne({ phoneNumber }, { $set: { refreshToken } })

  }

  findUserByRefreshToken = async (refreshToken: string) => {
    const user = await this.userModel.findOne({ refreshToken });
    if (user) {
      //@ts-ignore
      const { password, refreshToken, ...result } = user._doc;
      return result;
    }
    return null;



  }

  deleteRefreshTokenToDatabase = async (_id) => {
    await this.userModel.updateOne({ _id }, { $set: { refreshToken: "" } })

  }


  updateOrderHistoryUser = async (phoneNumber: any, _id: any) => {
    console.log('phoneNumber : ', phoneNumber)
    await this.userModel.updateOne({ phoneNumber }, { $push: { orderHistory: _id } })
  }

  updateAdressUser = async (_id: any, data: any) => {
    console.log('data :', data)
    let address = await this.userModel.updateOne({ _id }, { $push: { address: data } })
    return {
      message: "update list address",
      address
    }
  }

  updateItemShipper = async (id: any, idOrder: any) => {
    await this.userModel.updateOne({ _id: id }, { $push: { itemShipper: idOrder } })
  }
}
