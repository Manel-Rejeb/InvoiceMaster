import { Injectable, NotFoundException } from '@nestjs/common';

import { Organization } from './entities/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  async create(createOrganization: Organization): Promise<Organization> {
    const newOrganization =
      await this.organizationRepository.create(createOrganization);
    return this.organizationRepository.save(newOrganization);
  }

  async findAll(): Promise<Organization[]> {
    return this.organizationRepository.find();
  }

  async findOne(id: number): Promise<Organization> {
    const organizationData = await this.organizationRepository.findOneBy({
      id,
    });
    if (!organizationData) {
      throw new NotFoundException('Organization Not Found');
    }
    return organizationData;
  }

  async update(
    id: number,
    updateOrganization: Organization,
  ): Promise<Organization> {
    const organizationData = await this.organizationRepository.findOneBy({
      id,
    });
    if (!organizationData) {
      throw new NotFoundException('Organization Not Found');
    }
    await this.organizationRepository.update(id, updateOrganization);
    return await this.organizationRepository.findOneBy({
      id,
    });
  }

  async remove(id: number): Promise<Organization> {
    const organizationData = await this.organizationRepository.findOneBy({
      id,
    });
    if (!organizationData) {
      throw new NotFoundException('Organization not found');
    }
    return await this.organizationRepository.remove(organizationData);
  }
}
