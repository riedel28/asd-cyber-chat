import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

type AdminRequest = {
  user?: {
    roles?: string[];
  };
};

@Injectable()
export class IsAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AdminRequest>();
    return request.user?.roles?.includes('admin') ?? false;
  }
}
