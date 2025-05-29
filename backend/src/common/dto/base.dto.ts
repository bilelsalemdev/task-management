import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
  @ApiProperty({
    description: 'The unique identifier of the resource',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The date and time when the resource was created',
    example: '2023-05-29T12:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the resource was last updated',
    example: '2023-05-29T14:30:00.000Z',
  })
  updatedAt: Date;
}
