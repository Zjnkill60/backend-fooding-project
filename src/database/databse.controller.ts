import { Controller } from '@nestjs/common';
import { DatabseService } from './databse.service';

@Controller('databse')
export class DatabseController {
  constructor(private readonly databseService: DatabseService) {}
}
