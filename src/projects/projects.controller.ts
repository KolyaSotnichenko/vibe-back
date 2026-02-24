import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiSecurity,
} from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectStatus } from './entities/project.entity';

/**
 * Controller for managing projects
 * All endpoints require API key authentication via X-API-Key header
 */
@ApiTags('Projects')
@ApiSecurity('api-key')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  /**
   * Create a new project
   */
  @Post()
  @ApiOperation({
    summary: 'Create a new project',
    description:
      'Creates a new project with the provided data. Returns the created project with generated ID and timestamps.',
  })
  @ApiResponse({
    status: 201,
    description: 'Project successfully created',
    type: Project,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data (e.g., end date before start date)',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing API key',
  })
  create(@Body() createProjectDto: CreateProjectDto): Project {
    return this.projectsService.create(createProjectDto);
  }

  /**
   * Get all projects
   */
  @Get()
  @ApiOperation({
    summary: 'Get all projects',
    description:
      'Retrieves a list of all projects in the system. Can be filtered by status or tag using query parameters.',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ProjectStatus,
    description: 'Filter projects by status',
  })
  @ApiQuery({
    name: 'tag',
    required: false,
    type: String,
    description: 'Filter projects by tag',
  })
  @ApiResponse({
    status: 200,
    description: 'List of projects retrieved successfully',
    type: [Project],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing API key',
  })
  findAll(
    @Query('status') status?: ProjectStatus,
    @Query('tag') tag?: string,
  ): Project[] {
    if (status) {
      return this.projectsService.findByStatus(status);
    }
    if (tag) {
      return this.projectsService.findByTag(tag);
    }
    return this.projectsService.findAll();
  }

  /**
   * Get a single project by ID
   */
  @Get(':id')
  @ApiOperation({
    summary: 'Get a project by ID',
    description:
      'Retrieves detailed information about a specific project using its unique identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the project',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Project found and returned successfully',
    type: Project,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing API key',
  })
  @ApiResponse({
    status: 404,
    description: 'Project not found',
  })
  findOne(@Param('id') id: string): Project {
    return this.projectsService.findOne(id);
  }

  /**
   * Update a project
   */
  @Patch(':id')
  @ApiOperation({
    summary: 'Update a project',
    description:
      'Updates an existing project with the provided data. Only the fields included in the request body will be updated.',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the project to update',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Project updated successfully',
    type: Project,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing API key',
  })
  @ApiResponse({
    status: 404,
    description: 'Project not found',
  })
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Project {
    return this.projectsService.update(id, updateProjectDto);
  }

  /**
   * Delete a project
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a project',
    description:
      'Permanently deletes a project from the system. This action cannot be undone.',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the project to delete',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 204,
    description: 'Project deleted successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing API key',
  })
  @ApiResponse({
    status: 404,
    description: 'Project not found',
  })
  remove(@Param('id') id: string): void {
    this.projectsService.remove(id);
  }

  /**
   * Get project count
   */
  @Get('stats/count')
  @ApiOperation({
    summary: 'Get total project count',
    description: 'Returns the total number of projects in the system.',
  })
  @ApiResponse({
    status: 200,
    description: 'Project count retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        count: {
          type: 'number',
          example: 42,
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing API key',
  })
  getCount(): { count: number } {
    return { count: this.projectsService.count() };
  }
}
