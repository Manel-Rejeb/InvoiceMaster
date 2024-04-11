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
    @InjectRepository(CorporateCustomer)
    private readonly corporateRepository: Repository<CorporateCustomer>,
    @InjectRepository(IndividualCustomer)
    private readonly individualRepository: Repository<IndividualCustomer>,
  ) {}

  async create(createCustomer: Customer): Promise<Customer> {
    if (!createCustomer.type_customer) {
      const indi = this.individualRepository.create(createCustomer.individual);
      await this.individualRepository.save(indi);
      createCustomer.individual = indi;
    }

    if (createCustomer.type_customer) {
      const corp = this.corporateRepository.create(createCustomer.corporate);
      await this.corporateRepository.save(corp);
      createCustomer.corporate = corp;
    }

    return this.customerRepository.save(createCustomer);
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

    if (!updateCustomer.type_customer) {
      const indi = this.individualRepository.create(updateCustomer.individual);
      await this.individualRepository.save(indi);
      updateCustomer.individual = indi;
    }
    if (updateCustomer.type_customer) {
      const corp = this.corporateRepository.create(updateCustomer.corporate);
      await this.corporateRepository.save(corp);
      updateCustomer.corporate = corp;
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
