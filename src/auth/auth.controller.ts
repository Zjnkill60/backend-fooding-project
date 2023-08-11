import { Body, Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LocalAuthGuard } from './passport/local/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt/jwt-auth.guard';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Res({ passthrough: true }) response) {

    return this.authService.login(req.user, response)
  }

  @Post('/google')
  GoogleLogin(@Body() data, @Res({ passthrough: true }) response) {
    return this.authService.googleLogin(data, response)
  }

  @Post('/register')
  async register(@Body() data: RegisterUserDto) {

    return this.authService.register(data)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout(@Request() req, @Res({ passthrough: true }) response) {
    response.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: "none",
      secure: false,
    })

    return this.authService.handleLogOut(req.user)
  }


  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return {
      message: 'get profile ',
      user: req.user
    };
  }


  @Get('/refresh')
  refreshToken(@Request() req, @Res({ passthrough: true }) response) {
    let refreshToken = req.cookies['refreshToken']
    return this.authService.handleRefreshToken(refreshToken, response)
  }

}
