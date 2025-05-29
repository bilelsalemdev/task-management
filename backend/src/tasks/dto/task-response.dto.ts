import { ApiProperty } from '@nestjs/swagger';
import { TaskPriority, TaskStatus } from '../entities/task.entity';

export class TaskResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the task',
  })
  id: string;

  @ApiProperty({
    example: 'Implement login feature',
    description: 'Title of the task',
  })
  title: string;

  @ApiProperty({
    example: 'Create login form with validation and connect to API',
    description: 'Detailed description of the task',
    required: false,
  })
  description?: string;

  @ApiProperty({
    enum: TaskStatus,
    example: TaskStatus.IN_PROGRESS,
    description: 'Current status of the task',
  })
  status: TaskStatus;

  @ApiProperty({
    enum: TaskPriority,
    example: TaskPriority.MEDIUM,
    description: 'Priority level of the task',
  })
  priority: TaskPriority;

  @ApiProperty({
    example: '2023-05-29T10:00:00.000Z',
    description: 'Due date for the task',
    required: false,
  })
  dueDate?: Date;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the user who created the task',
  })
  createdBy: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174001',
    description: 'ID of the user assigned to the task',
    required: false,
  })
  assignedTo?: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174002',
    description: 'ID of the project this task belongs to',
    required: false,
  })
  projectId?: string;

  @ApiProperty({
    example: '2023-05-29T10:00:00.000Z',
    description: 'When the task was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-05-29T11:30:00.000Z',
    description: 'When the task was last updated',
  })
  updatedAt: Date;
}
