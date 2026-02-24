import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectStatus } from './entities/project.entity';
import { randomUUID } from 'crypto';

/**
 * Service handling all project-related business logic
 * Uses in-memory storage (Map) for data persistence
 */
@Injectable()
export class ProjectsService {
  // In-memory storage for projects
  private readonly projects: Map<string, Project> = new Map();

  /**
   * Creates a new project
   * @param createProjectDto - Data for creating the project
   * @returns The newly created project
   */
  create(createProjectDto: CreateProjectDto): Project {
    // Validate dates if endDate is provided
    if (createProjectDto.endDate) {
      const startDate = new Date(createProjectDto.startDate);
      const endDate = new Date(createProjectDto.endDate);

      if (endDate < startDate) {
        throw new BadRequestException(
          'End date cannot be earlier than start date',
        );
      }
    }

    const project: Project = {
      id: randomUUID(),
      name: createProjectDto.name,
      description: createProjectDto.description,
      status: createProjectDto.status ?? ProjectStatus.PLANNING,
      startDate: new Date(createProjectDto.startDate),
      endDate: createProjectDto.endDate
        ? new Date(createProjectDto.endDate)
        : undefined,
      owner: createProjectDto.owner,
      tags: createProjectDto.tags ?? [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.projects.set(project.id, project);
    return project;
  }

  /**
   * Retrieves all projects
   * @returns Array of all projects
   */
  findAll(): Project[] {
    return Array.from(this.projects.values());
  }

  /**
   * Retrieves a single project by ID
   * @param id - Project ID
   * @returns The requested project
   * @throws NotFoundException if project doesn't exist
   */
  findOne(id: string): Project {
    const project = this.projects.get(id);

    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }

    return project;
  }

  /**
   * Updates an existing project
   * @param id - Project ID
   * @param updateProjectDto - Data for updating the project
   * @returns The updated project
   * @throws NotFoundException if project doesn't exist
   * @throws BadRequestException if dates are invalid
   */
  update(id: string, updateProjectDto: UpdateProjectDto): Project {
    const project = this.findOne(id);

    // Validate dates if they're being updated
    const startDate = updateProjectDto.startDate
      ? new Date(updateProjectDto.startDate)
      : project.startDate;
    const endDate = updateProjectDto.endDate
      ? new Date(updateProjectDto.endDate)
      : project.endDate;

    if (endDate && endDate < startDate) {
      throw new BadRequestException(
        'End date cannot be earlier than start date',
      );
    }

    // Update project fields
    const updatedProject: Project = {
      ...project,
      name: updateProjectDto.name ?? project.name,
      description:
        updateProjectDto.description !== undefined
          ? updateProjectDto.description
          : project.description,
      status: updateProjectDto.status ?? project.status,
      startDate: updateProjectDto.startDate
        ? new Date(updateProjectDto.startDate)
        : project.startDate,
      endDate: updateProjectDto.endDate
        ? new Date(updateProjectDto.endDate)
        : project.endDate,
      owner:
        updateProjectDto.owner !== undefined
          ? updateProjectDto.owner
          : project.owner,
      tags:
        updateProjectDto.tags !== undefined
          ? updateProjectDto.tags
          : project.tags,
      updatedAt: new Date(),
    };

    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  /**
   * Deletes a project
   * @param id - Project ID
   * @throws NotFoundException if project doesn't exist
   */
  remove(id: string): void {
    const project = this.findOne(id);
    this.projects.delete(project.id);
  }

  /**
   * Searches projects by status
   * @param status - Project status to filter by
   * @returns Array of projects matching the status
   */
  findByStatus(status: ProjectStatus): Project[] {
    return Array.from(this.projects.values()).filter(
      (project) => project.status === status,
    );
  }

  /**
   * Searches projects by tag
   * @param tag - Tag to search for
   * @returns Array of projects containing the tag
   */
  findByTag(tag: string): Project[] {
    return Array.from(this.projects.values()).filter((project) =>
      project.tags?.includes(tag),
    );
  }

  /**
   * Deletes all projects (useful for testing)
   */
  clear(): void {
    this.projects.clear();
  }

  /**
   * Gets the total count of projects
   * @returns Number of projects in storage
   */
  count(): number {
    return this.projects.size;
  }
}
