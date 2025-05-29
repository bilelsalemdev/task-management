import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { TaskPriority, TaskStatus } from '../entities/task.entity';

export class UpdateTaskDto {
  @ApiPropertyOptional({
    example: 'Implement login feature with OAuth',
    description: 'Task title',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    example: 'Create login form with validation and connect to API with OAuth support',
    description: 'Task description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    enum: TaskStatus,
    description: 'Task status',
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ApiPropertyOptional({
    enum: TaskPriority,
    description: 'Task priority',
  })
  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @ApiPropertyOptional({
    example: '2023-12-31',
    description: 'Task due date',
  })
  @IsOptional()
  dueDate?: Date;

  @ApiPropertyOptional({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Assigned user ID',
  })
  @IsUUID()
  @IsOptional()
  assignedUserId?: string;

  @ApiPropertyOptional({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Project ID',
  })
  @IsUUID()
  @IsOptional()
  projectId?: string;
} 