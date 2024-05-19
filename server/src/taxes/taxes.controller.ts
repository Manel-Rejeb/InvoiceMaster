import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TaxesService } from './taxes.service';
import { Public } from 'src/shared/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Tax } from './entities/tax.entity';

@Public()
@ApiTags('tax')
@Controller('api/tax')
export class TaxesController {
  constructor(private readonly taxesService: TaxesService) {}

  @Post()
  create(@Body() createTax: Tax) {
    return this.taxesService.create(createTax);
  }

  // @Post()
  // create(@Body() createTax: Tax, @Query('estimate') estimateId) {
  //   return this.taxesService.create(createTax, +estimateId);
  // }

  @Get()
  findAll() {
    return this.taxesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taxesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTax: Tax) {
    return this.taxesService.update(+id, updateTax);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taxesService.remove(+id);
  }
}
