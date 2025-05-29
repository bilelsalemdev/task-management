import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    private usersService: UsersService,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const { managerId } = createProjectDto;
    
    if (managerId) {
      // Verify manager exists
      await this.usersService.findOne(managerId);
    }

    const project = this.projectsRepository.create(createProjectDto);
    return this.projectsRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find({
      relations: ['manager'],
    });
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: ['manager', 'tasks'],
    });
    
    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }
    
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.findOne(id);
    
    const { managerId } = updateProjectDto;
    if (managerId) {
      // Verify manager exists
      await this.usersService.findOne(managerId);
    }
    
    Object.assign(project, updateProjectDto);
    return this.projectsRepository.save(project);
  }

  async remove(id: string): Promise<void> {
    const project = await this.findOne(id);
    await this.projectsRepository.remove(project);
  }

  async findByManagerId(managerId: string): Promise<Project[]> {
    return this.projectsRepository.find({
      where: { managerId },
      relations: ['manager'],
    });
  }
} 