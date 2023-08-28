import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { GoogleUserDto, RegisterUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }


  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findPhoneNumberLogin(username);
    if (user && this.usersService.verifyHashPassword(pass, user.password)) {
      //@ts-ignore
      const { password, refreshToken, ...result } = user._doc;
      return result;
    }
    return null;
  }

  async login(user, response) {
    let refreshToken = this.generateRefreshToken(user)
    await this.usersService.updateRefreshToken(user.phoneNumber, refreshToken)

    response.cookie('refreshToken', refreshToken)
    return {
      message: 'login',
      user,
      access_token: this.jwtService.sign(user)
    }
  }

  async googleLogin(dataUserGoogle: GoogleUserDto, response) {

    let userExist = await this.usersService.registerUserGoogle(dataUserGoogle)

    if (userExist) {
      let { user, exist } = userExist
      let { avatar, _id, name, email, role, phoneNumber } = user
      let newPayload = { avatar, _id, name, email, role, phoneNumber }
      const refreshToken = this.generateRefreshToken(newPayload)
      await this.usersService.updateRefreshToken(phoneNumber, refreshToken)

      response.cookie('refreshToken', refreshToken, {
        expires: new Date(Date.now() + (3600 * 1000 * 24 * 180 * 1)),
        httpOnly: true,
        sameSite: "none",
        secure: "false",
      })


      return {
        message: "Login by google",
        access_token: this.jwtService.sign(newPayload),
        newPayload,
        exist
      };

    } else {
      throw new BadRequestException("do not verify phone number")
    }

  }

  async register(data: RegisterUserDto) {
    let user = await this.usersService.register(data)
    return {
      message: "register ",
      user
    }
  }

  generateRefreshToken = (payload: any) => {
    return this.jwtService.sign(payload, { secret: 'zjnkill18', expiresIn: '6000000s' })
  }

  handleRefreshToken = async (refreshToken: string, response) => {
    let user = await this.usersService.findUserByRefreshToken(refreshToken)
    console.log('user by refresh : ', user)
    if (user) {


      let newRefreshToken = this.generateRefreshToken(user)
      await this.usersService.updateRefreshToken(user.phoneNumber, newRefreshToken)

      response.cookie('refreshToken', newRefreshToken, {
        expires: new Date(Date.now() + (3600 * 1000 * 24 * 180 * 1)),
        httpOnly: true,
        sameSite: "none",
        secure: "false",
      })

      return {
        message: 'refresh token',
        access_token: this.jwtService.sign(user)
      }
    } else {
      throw new BadRequestException('Phiên đăng nhập hết hạn ')
    }
  }

  handleLogOut = async (dataJWT) => {
    await this.usersService.deleteRefreshTokenToDatabase(dataJWT._id)
    return {
      message: 'log out success !'
    }
  }




}
