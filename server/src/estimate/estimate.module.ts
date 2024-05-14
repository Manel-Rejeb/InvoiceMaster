import { Module } from '@nestjs/common';
import { EstimateService } from './estimate.service';
import { EstimateController } from './estimate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estimate } from './entities/estimate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estimate])],
  controllers: [EstimateController],
  providers: [EstimateService],
  exports: [TypeOrmModule, EstimateService],
})
export class EstimateModule {}
