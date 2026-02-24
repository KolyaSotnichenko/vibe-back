import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

/**
 * Module for managing projects
 * Provides global API key authentication guard
 */
@Module({
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
  exports: [ProjectsService],
})
export class ProjectsModule {}
