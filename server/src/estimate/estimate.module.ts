import { Module } from '@nestjs/common';
import { EstimateService } from './estimate.service';
import { EstimateController } from './estimate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estimate } from './entities/estimate.entity';
import { Item } from 'src/item/entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estimate, Item])],
  controllers: [EstimateController],
  providers: [EstimateService],
  exports: [TypeOrmModule, EstimateService],
})
export class EstimateModule {}
