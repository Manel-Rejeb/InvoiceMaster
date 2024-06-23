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

    savedEstimate.estimate_reference = this.generateEstimateReference(
      savedEstimate.id,
    );

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
    const estimateData = await this.estimateRepository.findOne({
      where: { id: id },
      relations: ['items.article', 'project', 'customer.corporate'],
    });
    if (!estimateData) {
      throw new NotFoundException('Estimate Not Found');
    }
    return estimateData;
  }

  async update(
    id: number,
    updateEstimate: Estimate,
    customerId: number,
    projectId?: number,
  ): Promise<Estimate> {
    const existingEstimate = await this.estimateRepository.findOne({
      where: { id },
      relations: ['items', 'project'], // Include 'project' relation
    });

    if (!existingEstimate) {
      throw new NotFoundException('Estimate Not Found');
    }

    // Update the properties of the existing estimate
    Object.assign(existingEstimate, updateEstimate);

    // If projectId is provided, retrieve the project entity and assign it to the estimate
    if (projectId) {
      const project = await this.projectRepository.findOne({
        where: { id: projectId },
      });
      if (!project) {
        throw new NotFoundException('Project not found');
      }
      existingEstimate.project = project;
    } else {
      // If projectId is not provided, remove the project association from the estimate
      existingEstimate.project = null;
    }

    // If customerId is provided, retrieve the customer entity and assign it to the estimate
    if (customerId) {
      const customer = await this.customerRepository.findOne({
        where: { id: customerId },
      });
      if (!customer) {
        throw new NotFoundException('Customer not found');
      }
      existingEstimate.customer = customer;
    }

    // Update existing items and remove any items not included in the updated list
    if (updateEstimate.items && updateEstimate.items.length > 0) {
      const updatedItemIds = updateEstimate.items.map((item) => item.id);

      // Remove items that are not in the updated list
      existingEstimate.items = existingEstimate.items.filter((item) =>
        updatedItemIds.includes(item.id),
      );

      for (const updatedItem of updateEstimate.items) {
        const existingItem = existingEstimate.items.find(
          (item) => item.id === updatedItem.id,
        );
        if (existingItem) {
          // Update existing item
          Object.assign(existingItem, updatedItem);
          await this.itemRepository.save(existingItem);
        } else {
          // If the item doesn't exist in the existing items, it's a new item, so save it
          updatedItem.estimate = existingEstimate;
          await this.itemRepository.save(updatedItem);
        }
      }
    } else {
      // If no items are provided in the update, remove all existing items
      existingEstimate.items = [];
    }

    // Save the updated estimate
    const updatedEstimate =
      await this.estimateRepository.save(existingEstimate);

    // Return the updated estimate
    return updatedEstimate;
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

  private generateEstimateReference(estimateId: number): string {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `EST-${estimateId}`;
  }
}
