import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { TaskPriority, TaskStatus } from '../entities/task.entity';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Implement login feature',
    description: 'Task title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    example: 'Create login form with validation and connect to API',
    description: 'Task description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    enum: TaskStatus,
    default: TaskStatus.TODO,
    description: 'Task status',
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ApiPropertyOptional({
    enum: TaskPriority,
    default: TaskPriority.MEDIUM,
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

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Project ID',
  })
  @IsUUID()
  @IsNotEmpty()
  projectId: string;
} 