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
      relations: ['individual', 'corporate', 'projects', 'invoices'],
    });
  }

  async findOne(id: number): Promise<Customer> {
    const customerData = await this.customerRepository.findOne({
      where: { id: id },
      relations: ['individual', 'corporate'],
    });
    if (!customerData) {
      throw new NotFoundException('Customer Not Found');
    } //try catch for error handling
    return customerData;
  }

  async update(id: number, updateCustomer: Customer): Promise<Customer> {
    const customerData = await this.customerRepository.findOneBy({ id });
    if (!customerData) {
      throw new NotFoundException('Customer Not Found');
    }

    /**
     * @title Update Doc One to One
     * @description Update each at a time
     * @author manel-rejeb
     * deconstruction of the object we are sending on the request to avoid resetting corporate and individuak throws an error by deconstructing we strip the relation adn keep to update only the customer
     */
    const { corporate, individual, ...rest } = updateCustomer;

    await this.customerRepository.update(id, { ...rest });

    if (!updateCustomer.type_customer) {
      // this.individualRepository.delete(updateCustomer.id)
      await this.individualRepository.update(individual.id, individual);
    }
    if (updateCustomer.type_customer) {
      // this.individualRepository.delete(updateCustomer.id)
      await this.corporateRepository.update(corporate.id, corporate);
    }

    return await this.customerRepository.findOneBy({ id });
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
