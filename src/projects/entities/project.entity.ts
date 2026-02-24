import { ApiProperty } from '@nestjs/swagger';

/**
 * Project entity representing a project in the system
 */
export class Project {
  @ApiProperty({
    description: 'Unique identifier of the project',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the project',
    example: 'Website Redesign',
    minLength: 1,
    maxLength: 200,
  })
  name: string;

  @ApiProperty({
    description: 'Detailed description of the project',
    example: 'Complete overhaul of the company website with modern design',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Current status of the project',
    enum: ['PLANNING', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'CANCELLED'],
    example: 'IN_PROGRESS',
  })
  status: ProjectStatus;

  @ApiProperty({
    description: 'Project start date',
    example: '2024-01-15T00:00:00.000Z',
    type: String,
  })
  startDate: Date;

  @ApiProperty({
    description: 'Project end date',
    example: '2024-06-30T00:00:00.000Z',
    type: String,
    required: false,
  })
  endDate?: Date;

  @ApiProperty({
    description: 'Owner or responsible person for the project',
    example: 'John Doe',
    required: false,
  })
  owner?: string;

  @ApiProperty({
    description: 'List of tags associated with the project',
    type: [String],
    example: ['web', 'frontend', 'design'],
    required: false,
  })
  tags?: string[];

  @ApiProperty({
    description: 'Timestamp when the project was created',
    example: '2024-01-01T10:00:00.000Z',
    type: String,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the project was last updated',
    example: '2024-01-15T14:30:00.000Z',
    type: String,
  })
  updatedAt: Date;
}

/**
 * Enum for project status values
 */
export enum ProjectStatus {
  PLANNING = 'PLANNING',
  IN_PROGRESS = 'IN_PROGRESS',
  ON_HOLD = 'ON_HOLD',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}
