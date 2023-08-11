import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('address/:id')
  updateAddress(@Param('id') id: string, @Body() data: CreateUserDto) {
    return this.usersService.updateAdressUser(id, data);
  }

  @Get()
  findAll(@Query() queryString) {
    return this.usersService.findAll(queryString);
  }

  @Get(':id')
  findOne(@Param('id') phoneNumber: string) {
    return this.usersService.findOne(phoneNumber);
  }



  @Get('shipper/:id')
  findOneByID(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch('info/:id')
  updateInfo(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateInfoUser(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
