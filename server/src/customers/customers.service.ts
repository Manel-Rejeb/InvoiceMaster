import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from './entities/customer.entity';
import { CorporateCustomer } from './entities/corporation.entity';
import { IndividualCustomer } from './entities/individual.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomer: Customer): Promise<Customer> {
    const newCustomer = await this.customerRepository.create(createCustomer);
    return this.customerRepository.save(newCustomer);
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find({
      relations: ['individual', 'corporate'],
    });
  }

  async findOne(id: number): Promise<Customer> {
    const customerData = await this.customerRepository.findOne({
      where: { id: id },
      relations: ['individual', 'corporate'],
    });
    if (!customerData) {
      throw new NotFoundException('Customer Not Found');
    }
    return customerData;
  }

  async update(id: number, updateCustomer: Customer): Promise<Customer> {
    const customerData = await this.customerRepository.findOneBy({ id });
    if (!customerData) {
      throw new NotFoundException('Customer Not Found');
    }
    const updatedCustomer = this.customerRepository.merge(
      customerData,
      updateCustomer,
    );
    return await this.customerRepository.save(updatedCustomer);
  }

  async remove(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return await this.customerRepository.remove(customer);
  }

  async findOneByReferenceCode(
    reference_code: string,
  ): Promise<Customer | null> {
    return await this.customerRepository.findOne({
      where: { customer_reference: reference_code },
    });
  }
}
