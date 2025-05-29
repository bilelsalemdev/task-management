import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { 
  ApiBearerAuth, 
  ApiOperation, 
  ApiTags, 
  ApiParam,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../users/entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';

@ApiTags('tasks')
@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new task',
    description: 'Creates a new task with the provided details. Requires authentication.'
  })
  @ApiBody({ type: CreateTaskDto })
  @ApiCreatedResponse({
    description: 'The task has been successfully created.',
    type: TaskResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiUnauthorizedResponse({ description: 'Not authenticated' })
  async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    const task = await this.tasksService.create(createTaskDto);
    return this.mapToResponseDto(task);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all tasks',
    description: 'Retrieves a list of all tasks. Can be filtered by query parameters.'
  })
  @ApiOkResponse({
    description: 'List of tasks retrieved successfully.',
    type: [TaskResponseDto],
  })
  @ApiUnauthorizedResponse({ description: 'Not authenticated' })
  async findAll(): Promise<TaskResponseDto[]> {
    const tasks = await this.tasksService.findAll();
    return tasks.map(task => this.mapToResponseDto(task));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get task by ID',
    description: 'Retrieves a single task by its unique identifier.'
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the task to retrieve',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    description: 'Task retrieved successfully.',
    type: TaskResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Task not found' })
  @ApiUnauthorizedResponse({ description: 'Not authenticated' })
  async findOne(@Param('id') id: string): Promise<TaskResponseDto> {
    const task = await this.tasksService.findOne(id);
    return this.mapToResponseDto(task);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a task',
    description: 'Updates an existing task with the provided data.'
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the task to update',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdateTaskDto })
  @ApiOkResponse({
    description: 'Task updated successfully.',
    type: TaskResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Task not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiUnauthorizedResponse({ description: 'Not authenticated' })
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    const task = await this.tasksService.update(id, updateTaskDto);
    return this.mapToResponseDto(task);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({
    summary: 'Delete a task',
    description: 'Deletes a task. Only admins and managers can perform this action.'
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the task to delete',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({ description: 'Task deleted successfully.' })
  @ApiForbiddenResponse({ description: 'Insufficient permissions' })
  @ApiNotFoundResponse({ description: 'Task not found' })
  @ApiUnauthorizedResponse({ description: 'Not authenticated' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove(id);
  }

  /**
   * Maps a Task entity to a TaskResponseDto
   * @param task The task entity to map
   * @returns A TaskResponseDto
   */
  private mapToResponseDto(task: Task): TaskResponseDto {
    return plainToInstance(TaskResponseDto, {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      createdBy: task.createdBy,
      assignedTo: task.assignedUser?.id,
      projectId: task.project?.id,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    });
  }

  @Get('project/:projectId')
  @ApiOperation({ summary: 'Get tasks by project ID' })
  @ApiResponse({ status: 200, description: 'Return tasks by project' })
  findByProject(@Param('projectId') projectId: string) {
    return this.tasksService.findByProject(projectId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get tasks by user ID' })
  @ApiResponse({ status: 200, description: 'Return tasks by user' })
  findByUser(@Param('userId') userId: string) {
    return this.tasksService.findByUser(userId);
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get task statistics' })
  @ApiResponse({ status: 200, description: 'Return task statistics' })
  getStatistics() {
    return this.tasksService.getTaskStatistics();
  }
} 