import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { extractToken } from 'src/shared/utils/functions/extract-token/token-extract';
import { ROLES_KEY } from 'src/shared/utils/decorators/roles-decorator';
import { GetUserRoleService } from 'src/features/roles-users/get-user-role/get-user-role.service';

@Injectable()
export class RolesGuards implements CanActivate {
  constructor(
    private reflector: Reflector,
    private getUserRole: GetUserRoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || !requiredRoles.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const payload = await extractToken(request);

    const userRoles = await this.getUserRole.execute(payload.id);

    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
