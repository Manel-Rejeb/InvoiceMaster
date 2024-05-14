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

  async create(createProject: Project): Promise<Project> {
    const newProject = await this.projectRepository.create(createProject);
    return this.projectRepository.save(newProject);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({
      relations: ['customers'],
    });
  }

  async findOne(id: number): Promise<Project> {
    const projectData = await this.projectRepository.findOneBy({ id });
    if (!projectData) {
      throw new NotFoundException('Project Not Found');
    }
    return projectData;
  }

  async update(id: number, updateProject: Project): Promise<Project> {
    const projectData = await this.projectRepository.findOneBy({ id });
    if (!projectData) {
      throw new NotFoundException('Project Not Found');
    }
    await this.projectRepository.update(id, updateProject);
    return await this.projectRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<Project> {
    const projectData = await this.projectRepository.findOneBy({ id });
    if (!projectData) {
      throw new NotFoundException('Project not found');
    }
    return await this.projectRepository.remove(projectData);
  }

  async addCustomerToProject(
    projectId: number,
    customerId: number,
  ): Promise<Project> {
    const projectData = await this.projectRepository.findOneBy({
      id: projectId,
    });
    if (!projectData) {
      throw new NotFoundException('Project Not Found');
    }

    const customerData = await this.customerRepository.findOneBy({
      id: customerId,
    });
    if (!customerData) {
      throw new NotFoundException('Customer Not Found');
    }

    projectData.customers.push(customerData);
    return this.projectRepository.save(projectData);
  }
}
