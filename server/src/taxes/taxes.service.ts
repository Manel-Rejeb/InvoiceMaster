import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tax } from './entities/tax.entity';

@Injectable()
export class TaxesService {
  constructor(
    @InjectRepository(Tax)
    private readonly taxRepository: Repository<Tax>,
  ) {}

  async create(createTax: Tax): Promise<Tax> {
    const newTax = await this.taxRepository.create(createTax);
    return this.taxRepository.save(newTax);
  }

  async findAll(): Promise<Tax[]> {
    return this.taxRepository.find();
  }

  async findOne(id: number): Promise<Tax> {
    const TaxData = await this.taxRepository.findOneBy({ id });
    if (!TaxData) {
      throw new NotFoundException('Tax Not Found');
    }
    return TaxData;
  }

  async update(id: number, updateTax: Tax): Promise<Tax> {
    const TaxData = await this.taxRepository.findOneBy({ id });
    if (!TaxData) {
      throw new NotFoundException('Tax Not Found');
    }
    await this.taxRepository.update(id, updateTax);
    return await this.taxRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<Tax> {
    const TaxData = await this.taxRepository.findOneBy({ id });
    if (!TaxData) {
      throw new NotFoundException('Tax not found');
    }
    return await this.taxRepository.remove(TaxData);
  }
}
