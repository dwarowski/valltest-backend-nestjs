import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { ROLES_KEY } from "src/decorators/roles-decorator";
import { RolesUsersService } from "src/roles-users/roles-users.service";

@Injectable()
export class RolesGuards implements CanActivate {
    constructor(
        private reflector: Reflector,
        private RolesUserService: RolesUsersService,
        private jwtService: JwtService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ])

        if (!requiredRoles.length) {
            return true
        }

        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization

        if (!token || !token.startsWith('Bearer ')) {
            throw new UnauthorizedException('Invalid authorization header');
        }
        const jwt = token.split(' ')[1]

        if (!jwt) {
            throw new UnauthorizedException('No token provided');
        }

        try {
            const payload = await this.jwtService.verifyAsync(jwt, {
                secret: process.env.JWT_SECRET
            });

            if (!payload) {
                return false;
            }

            const userRoles = await this.RolesUserService.getUserRoles(payload.username)

            return requiredRoles.some((role) =>
                userRoles.includes(role),
            );

        } catch (error) {
            console.log(error)
            throw new UnauthorizedException('Invalid token');
        }
    }
}