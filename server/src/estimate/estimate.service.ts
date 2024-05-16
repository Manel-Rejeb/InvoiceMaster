import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Estimate } from './entities/estimate.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/item/entities/item.entity';

@Injectable()
export class EstimateService {
  constructor(
    @InjectRepository(Estimate)
    private readonly estimateRepository: Repository<Estimate>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createEstimate: Estimate): Promise<Estimate> {
    const newEstimate = await this.estimateRepository.create(createEstimate);
    return this.estimateRepository.save(newEstimate);
  }

  async findAll(): Promise<Estimate[]> {
    return this.estimateRepository.find({
      relations: ['items', 'project'],
    });
  }

  async findOne(id: number): Promise<Estimate> {
    const estimateData = await this.estimateRepository.findOneBy({ id });
    if (!estimateData) {
      throw new NotFoundException('Estimate Not Found');
    }
    return estimateData;
  }

  async update(id: number, updateEstimate: Estimate): Promise<Estimate> {
    const estimateData = await this.estimateRepository.findOneBy({ id });
    if (!estimateData) {
      throw new NotFoundException('Estimate Not Found');
    }
    await this.estimateRepository.update(id, updateEstimate);
    return await this.estimateRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const estimate = await this.estimateRepository.findOneBy({ id });
    if (!estimate) {
      throw new NotFoundException('Estimate Not Found');
    }
    return await this.estimateRepository.remove(estimate);
  }

  async findOneByReferenceCode(
    reference_code: string,
  ): Promise<Estimate | null> {
    return await this.estimateRepository.findOne({
      where: { estimate_reference: reference_code },
    });
  }
}
