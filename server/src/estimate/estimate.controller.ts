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
import { EstimateService } from './estimate.service';
import { Estimate } from './entities/estimate.entity';
import { Public } from 'src/shared/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@Public()
@ApiTags('estimate')
@Controller('api/estimate')
export class EstimateController {
  constructor(private readonly estimateService: EstimateService) {}

  @Post()
  create(
    @Body() createEstimate: Estimate,
    @Query('customer') customer: string,
    @Query('project') project: string,
  ) {
    return this.estimateService.create(createEstimate, +customer, +project);
  }

  @Get()
  findAll() {
    return this.estimateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estimateService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstimate: Estimate,
    @Query('customer') customer: string,
    @Query('project') project: string,
  ) {
    return this.estimateService.update(
      +id,
      updateEstimate,
      +customer,
      +project,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estimateService.remove(+id);
  }
}
