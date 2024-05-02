import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createProject: Project): Promise<Project> {
    const newProject = await this.projectRepository.create(createProject);
    return this.projectRepository.save(newProject);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find();
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
}
