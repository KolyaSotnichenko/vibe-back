import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Public } from './common/decorators/public.decorator';

/**
 * Root controller for basic API information
 */
@ApiTags('General')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Welcome endpoint
   */
  @Get()
  @Public()
  @ApiOperation({
    summary: 'API welcome message',
    description:
      'Returns a welcome message and basic information about the API. This endpoint is public.',
  })
  @ApiResponse({
    status: 200,
    description: 'Welcome message',
    schema: {
      type: 'string',
      example: 'Welcome to Vibe Backend API',
    },
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
