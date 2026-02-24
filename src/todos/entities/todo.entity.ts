import { ApiProperty } from '@nestjs/swagger';

export class Todo {
  @ApiProperty({
    description: 'Unique identifier of the todo',
    example: '1',
  })
  id: string;

  @ApiProperty({
    description: 'Title of the todo',
    example: 'Buy groceries',
  })
  title: string;

  @ApiProperty({
    description: 'Detailed description of the todo',
    example: 'Buy milk, eggs, and bread from the store',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Completion status of the todo',
    example: false,
    default: false,
  })
  completed: boolean;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2026-02-24T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2026-02-24T10:30:00.000Z',
  })
  updatedAt: Date;
}
