import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesUsersEntity } from './entity/roles-users.entity';
import { Repository } from 'typeorm';
import { RolesService } from 'src/roles/roles.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesUsersService {
    constructor(
        @Inject(UserService)
        private userService: UserService,
        @Inject(RolesService)
        private rolesService: RolesService,
        @InjectRepository(RolesUsersEntity)
        private repository: Repository<RolesUsersEntity>,
    ) { }

    async addRoleToUser(roleName: string, user: string) {
        const roleEntity = await this.rolesService.getRole(roleName);

        if (!roleEntity) {
            throw new BadRequestException('role doesn`t exist')
        }

        const userEntity = await this.userService.getUserByName(user)

        return await this.repository.save({ user: userEntity, role: roleEntity })
    }
}
