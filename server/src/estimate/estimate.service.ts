import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Estimate } from 'src/estimate/entities/estimate.entity';
import { Item } from 'src/item/entities/item.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Project } from 'src/projects/entities/project.entity';

@Injectable()
export class EstimateService {
  constructor(
    @InjectRepository(Estimate)
    private readonly estimateRepository: Repository<Estimate>,

    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(
    createEstimate: Estimate,
    customerId: number,
    projectId?: number,
  ): Promise<Estimate> {
    // Create the new estimate entity
    const newEstimate = this.estimateRepository.create(createEstimate);

    // Retrieve the customer entity asynchronously
    const customer = await this.customerRepository.findOneBy({
      id: customerId,
    });

    if (!customer) {
      throw new Error('Customer not found');
    }

    // Assign the customer to the new estimate
    newEstimate.customer = customer;

    // If projectId is provided, retrieve the project entity and assign it to the estimate
    if (projectId) {
      const project = await this.projectRepository.findOneBy({ id: projectId });
      if (!project) {
        throw new Error('Project not found');
      }
      newEstimate.project = project;
    } else {
      // If projectId is not provided, do not create an empty project associated with the estimate
      newEstimate.project = null;
    }

    // Save the new estimate entity
    const savedEstimate = await this.estimateRepository.save(newEstimate);

    // Associate items with the estimate
    if (createEstimate.items && createEstimate.items.length > 0) {
      // Set the estimate property for each item
      createEstimate.items.forEach((item) => (item.estimate = savedEstimate));
      // Save the items
      await this.itemRepository.save(createEstimate.items);
    }

    // Generate the estimate reference
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');

    savedEstimate.estimate_reference = `#INV-${savedEstimate.id}${day}${month}`;

    // Update the saved estimate with the new estimate reference
    await this.estimateRepository.update(savedEstimate.id, {
      estimate_reference: savedEstimate.estimate_reference,
    });

    return savedEstimate;
  }

  async findAll(): Promise<Estimate[]> {
    return this.estimateRepository.find({
      relations: ['items.article', 'project', 'customer.corporate'],
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
