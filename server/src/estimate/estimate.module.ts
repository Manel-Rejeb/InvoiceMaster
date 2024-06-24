import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstimateService } from './estimate.service';
import { EstimateController } from './estimate.controller';

import { Estimate } from 'src/estimate/entities/estimate.entity';
import { Item } from 'src/item/entities/item.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Invoice } from 'src/invoices/entities/invoice.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Estimate, Item, Customer, Project, Invoice]),
  ],
  controllers: [EstimateController],
  providers: [EstimateService],
  exports: [TypeOrmModule, EstimateService],
})
export class EstimateModule {}
