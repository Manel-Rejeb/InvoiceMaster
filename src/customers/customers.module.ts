import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Customer } from './entities/customer.entity';
import { CorporateCustomer } from './entities/corporation.entity';
import { IndividualCustomer } from './entities/individual.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer, CorporateCustomer, IndividualCustomer]),
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [TypeOrmModule, CustomersService],
})
export class CustomersModule {}
