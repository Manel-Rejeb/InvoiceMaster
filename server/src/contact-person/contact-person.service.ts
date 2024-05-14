import { Injectable, NotFoundException } from '@nestjs/common';
import { ContactPerson } from './entities/contact-person.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContactPersonService {
  constructor(
    @InjectRepository(ContactPerson)
    private readonly contactPersonRepository: Repository<ContactPerson>,
  ) {}

  async create(createContactPerson: ContactPerson): Promise<ContactPerson> {
    const newContactPerson =
      await this.contactPersonRepository.create(createContactPerson);
    return this.contactPersonRepository.save(newContactPerson);
  }

  async findAll(): Promise<ContactPerson[]> {
    return this.contactPersonRepository.find();
  }

  async findOne(id: number): Promise<ContactPerson> {
    const itemData = await this.contactPersonRepository.findOneBy({ id });
    if (!itemData) {
      throw new NotFoundException('Contact Person Not Found');
    }
    return itemData;
  }

  async update(
    id: number,
    updateContactPerson: ContactPerson,
  ): Promise<ContactPerson> {
    const itemData = await this.contactPersonRepository.findOneBy({ id });
    if (!itemData) {
      throw new NotFoundException('Contact Person Not Found');
    }
    const updatedContactPerson = this.contactPersonRepository.merge(
      itemData,
      updateContactPerson,
    );
    return await this.contactPersonRepository.save(updatedContactPerson);
  }

  async remove(id: number): Promise<ContactPerson> {
    const item = await this.contactPersonRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Contact Person Not Found');
    }
    return await this.contactPersonRepository.remove(item);
  }
}
