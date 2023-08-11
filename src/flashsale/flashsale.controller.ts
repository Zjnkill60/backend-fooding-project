import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FlashsaleService } from './flashsale.service';
import { CreateFlashsaleDto } from './dto/create-flashsale.dto';
import { UpdateFlashsaleDto } from './dto/update-flashsale.dto';

@Controller('flashsale')
export class FlashsaleController {
  constructor(private readonly flashsaleService: FlashsaleService) { }

  @Post()
  create(@Body() createFlashsaleDto: CreateFlashsaleDto) {
    return this.flashsaleService.create(createFlashsaleDto);
  }

  @Get()
  findAll() {
    return this.flashsaleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flashsaleService.findOne(+id);
  }

  @Post('create/:id')
  createNewItem(@Param('id') id: string, @Body() createFlashsaleDto: UpdateFlashsaleDto) {
    return this.flashsaleService.createNewItem(id, createFlashsaleDto);
  }

  @Patch()
  update(@Body() updateFlashsaleDto: UpdateFlashsaleDto) {
    return this.flashsaleService.update(updateFlashsaleDto);
  }

  @Patch('item/:id')
  remove(@Param('id') id: string, @Body() data: string) {

    return this.flashsaleService.remove(id, data);
  }

  @Patch('timer/:id')
  updateTimer(@Param('id') id: string, @Body() data: any) {
    return this.flashsaleService.updateTimer(id, data);
  }
}
