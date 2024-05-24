import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Customer } from './entities/customer.entity';
import { Corporate } from './entities/corporation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Corporate])],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [TypeOrmModule, CustomersService],
})
export class CustomersModule {}
