import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

/**
 * Guard that validates API key authentication
 * Checks for X-API-Key header and validates against the configured test key
 */
@Injectable()
export class ApiKeyGuard implements CanActivate {
  // Test API key for development
  private readonly API_KEY = 'vibe-test-api-key-2024-secure-token-12345';

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Check if route is marked as public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey) {
      throw new UnauthorizedException(
        'API key is missing. Please provide X-API-Key header.',
      );
    }

    if (apiKey !== this.API_KEY) {
      throw new UnauthorizedException('Invalid API key.');
    }

    return true;
  }
}
