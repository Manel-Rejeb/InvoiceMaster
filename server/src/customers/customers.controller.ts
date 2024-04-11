import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from './entities/customer.entity';
import { Public } from 'src/shared/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@Public()
@ApiTags('customer')
@Controller('api/customer')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Body() createCustomer: Customer) {
    return this.customersService.create(createCustomer);
  }

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @Get('search/:customer_reference')
  findOneBy(@Param('customer_reference') customer_reference: string) {
    return this.customersService.findOneByReferenceCode(customer_reference);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomer: Customer) {
    return this.customersService.update(+id, updateCustomer);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }
}
