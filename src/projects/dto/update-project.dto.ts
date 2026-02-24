import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsOptional,
  IsDateString,
  IsArray,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ProjectStatus } from '../entities/project.entity';

/**
 * DTO for updating an existing project
 * All fields are optional
 */
export class UpdateProjectDto {
  @ApiProperty({
    description: 'Name of the project',
    example: 'Website Redesign - Updated',
    minLength: 1,
    maxLength: 200,
    required: false,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Detailed description of the project',
    example: 'Complete overhaul of the company website with modern design and improved UX',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Current status of the project',
    enum: ProjectStatus,
    example: ProjectStatus.IN_PROGRESS,
    required: false,
  })
  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;

  @ApiProperty({
    description: 'Project start date (ISO 8601 format)',
    example: '2024-01-15T00:00:00.000Z',
    type: String,
    required: false,
  })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiProperty({
    description: 'Project end date (ISO 8601 format)',
    example: '2024-06-30T00:00:00.000Z',
    type: String,
    required: false,
  })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiProperty({
    description: 'Owner or responsible person for the project',
    example: 'Jane Smith',
    required: false,
  })
  @IsString()
  @IsOptional()
  owner?: string;

  @ApiProperty({
    description: 'List of tags associated with the project',
    type: [String],
    example: ['web', 'frontend', 'design', 'ux'],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
