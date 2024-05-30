import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { Customer } from 'src/customers/entities/customer.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createProject: Project, customerId: number): Promise<Project> {
    const customer = await this.customerRepository.findOneBy({
      id: customerId,
    });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const newProject = await this.projectRepository.create({
      ...createProject,
      customer: customer,
    });
    return this.projectRepository.save(newProject);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({
      relations: ['customer.corporate', 'estimates'],
      order: {
        id: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Project> {
    const projectData = await this.projectRepository.findOne({
      where: { id: id },
      relations: ['customer.corporate', 'estimates'],
    });
    if (!projectData) {
      throw new NotFoundException('Project Not Found');
    }
    return projectData;
  }

  async update(
    id: number,
    updateProject: Project,
    customerId: number,
  ): Promise<Project> {
    const projectData = await this.projectRepository.findOneBy({ id });
    if (!projectData) {
      throw new NotFoundException('Project Not Found');
    }

    const customer = await this.customerRepository.findOneBy({
      id: customerId,
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    await this.projectRepository.update(id, {
      ...updateProject,
      customer: customer,
    });
    return await this.projectRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<Project> {
    const projectData = await this.projectRepository.findOneBy({ id });
    if (!projectData) {
      throw new NotFoundException('Project not found');
    }
    return await this.projectRepository.remove(projectData);
  }

  // async addCustomerToProject(
  //   projectId: number,
  //   customerId: number,
  // ): Promise<Project> {
  //   const projectData = await this.projectRepository.findOneBy({
  //     id: projectId,
  //   });
  //   if (!projectData) {
  //     throw new NotFoundException('Project Not Found');
  //   }

  //   const customerData = await this.customerRepository.findOneBy({
  //     id: customerId,
  //   });
  //   if (!customerData) {
  //     throw new NotFoundException('Customer Not Found');
  //   }

  //   projectData.customer = customerData;
  //   return this.projectRepository.save(projectData);
  // }
}
