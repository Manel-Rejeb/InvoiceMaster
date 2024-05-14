import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createItem: Item): Promise<Item> {
    const newItem = await this.itemRepository.create(createItem);
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
    const updatedItem = this.itemRepository.merge(itemData, updateItem);
    return await this.itemRepository.save(updatedItem);
  }

  async remove(id: number): Promise<Item> {
    const item = await this.itemRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Item Not Found');
    }
    return await this.itemRepository.remove(item);
  }
}
