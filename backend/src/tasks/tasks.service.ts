import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsService } from '../projects/projects.service';
import { UsersService } from '../users/users.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private usersService: UsersService,
    private projectsService: ProjectsService,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { projectId, assignedUserId } = createTaskDto;
    
    // Verify project exists
    await this.projectsService.findOne(projectId);
    
    if (assignedUserId) {
      // Verify user exists
      await this.usersService.findOne(assignedUserId);
    }
    
    const task = this.tasksRepository.create(createTaskDto);
    return this.tasksRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find({
      relations: ['assignedUser', 'project'],
    });
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['assignedUser', 'project'],
    });
    
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    
    const { projectId, assignedUserId } = updateTaskDto;
    
    if (projectId) {
      // Verify project exists
      await this.projectsService.findOne(projectId);
    }
    
    if (assignedUserId) {
      // Verify user exists
      await this.usersService.findOne(assignedUserId);
    }
    
    Object.assign(task, updateTaskDto);
    return this.tasksRepository.save(task);
  }

  async remove(id: string): Promise<void> {
    const task = await this.findOne(id);
    await this.tasksRepository.remove(task);
  }

  async findByProject(projectId: string): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { projectId },
      relations: ['assignedUser'],
    });
  }

  async findByUser(userId: string): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { assignedUserId: userId },
      relations: ['project'],
    });
  }

  async getTaskStatistics(): Promise<{
    total: number;
    todo: number;
    inProgress: number;
    done: number;
    completionRate: number;
  }> {
    const [total, todo, inProgress, done] = await Promise.all([
      this.tasksRepository.count(),
      this.tasksRepository.count({ where: { status: TaskStatus.TODO } }),
      this.tasksRepository.count({ where: { status: TaskStatus.IN_PROGRESS } }),
      this.tasksRepository.count({ where: { status: TaskStatus.DONE } }),
    ]);
    
    const completionRate = total > 0 ? (done / total) * 100 : 0;
    
    return {
      total,
      todo,
      inProgress,
      done,
      completionRate,
    };
  }
} 