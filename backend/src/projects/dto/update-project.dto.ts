import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateProjectDto {
  @ApiPropertyOptional({
    example: 'Website Redesign V2',
    description: 'Project name',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: 'Redesign the company website with modern UI and improved UX',
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

  @ApiPropertyOptional({
    example: true,
    description: 'Project active status',
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
} 