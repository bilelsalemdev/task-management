import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    example: 'Website Redesign',
    description: 'Project name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    example: 'Redesign the company website with modern UI',
    description: 'Project description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Manager ID',
  })
  @IsUUID()
  @IsOptional()
  managerId?: string;
} 