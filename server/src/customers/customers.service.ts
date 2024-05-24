import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from 'src/customers/entities/customer.entity';
import { Corporate } from 'src/customers/entities/corporation.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Corporate)
    private readonly corporateRepository: Repository<Corporate>,
  ) {}

  async create(createCustomer: Customer): Promise<Customer> {
    if (createCustomer.corporate && createCustomer.customer_type) {
      const corporate = this.corporateRepository.create(
        createCustomer.corporate,
      );
      await this.corporateRepository.save(corporate);
      createCustomer.corporate = corporate;
    }
    createCustomer.customer_reference = `CLT#${createCustomer.customer_contact_name.slice(0, 1).toUpperCase()}-${Date.now()}`;
    return this.customerRepository.save({ ...createCustomer });
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find({
      relations: ['corporate', 'projects', 'estimates'],
    });
  }

  async findOne(id: number): Promise<Customer> {
    const customerData = await this.customerRepository.findOne({
      where: { id: id },
      relations: ['corporate'],
    });
    if (!customerData) {
      throw new NotFoundException('Customer Not Found');
    } //try catch for error handling
    return customerData;
  }

  async update(id: number, updateCustomer: Customer): Promise<Customer> {
    // Retrieve existing customer data
    const customerData = await this.customerRepository.findOneBy({ id });

    if (!customerData) {
      throw new NotFoundException('Customer Not Found');
    }

    const { corporate, ...rest } = updateCustomer;

    // Update customer data
    await this.customerRepository.update(id, { ...rest });

    // If corporate data is provided and customer_type is true, update Corporate entity
    if (updateCustomer.customer_type && updateCustomer.corporate) {
      await this.corporateRepository.update(corporate.id, corporate);
    }

    // Retrieve and return updated customer data
    return await this.customerRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return await this.customerRepository.remove(customer);
  }
}
