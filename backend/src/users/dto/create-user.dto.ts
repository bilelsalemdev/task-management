import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'John',
    description: 'First name',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password',
  })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({
    enum: UserRole,
    default: UserRole.USER,
    description: 'User role',
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
} 