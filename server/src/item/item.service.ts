import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Estimate } from 'src/estimate/entities/estimate.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,

    @InjectRepository(Estimate)
    private readonly estimateRepository: Repository<Estimate>,
  ) {}

  async create(createItem: Item, estimateId: number): Promise<Item> {
    const estimate = await this.estimateRepository.findOneBy({
      id: estimateId,
    });

    if (!estimate) {
      throw new NotFoundException('estimate not found');
    }

    const newItem = await this.itemRepository.create({
      ...createItem,
      estimate: estimate,
    });
    return this.itemRepository.save(newItem);
  }

  async findAll(): Promise<Item[]> {
    return this.itemRepository.find({
      relations: ['estimate'],
    });
  }

  async findOne(id: number): Promise<Item> {
    const itemData = await this.itemRepository.findOneBy({ id });
    if (!itemData) {
      throw new NotFoundException('Item Not Found');
    }
    return itemData;
  }

  async update(id: number, updateItem: Item): Promise<Item> {
    const itemData = await this.itemRepository.findOneBy({ id });
    if (!itemData) {
      throw new NotFoundException('Item Not Found');
    }
    await this.itemRepository.update(id, updateItem);
    return await this.itemRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<Item> {
    const item = await this.itemRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Item Not Found');
    }
    return await this.itemRepository.remove(item);
  }
}
