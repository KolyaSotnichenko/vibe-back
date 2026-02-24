import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    description: 'Title of the todo',
    example: 'Buy groceries',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Detailed description of the todo',
    example: 'Buy milk, eggs, and bread from the store',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Completion status of the todo',
    example: false,
    default: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
