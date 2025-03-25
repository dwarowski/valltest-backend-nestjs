import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesUsersEntity } from './entity/roles-users.entity';
import { Repository } from 'typeorm';
import { RolesService } from 'src/roles/roles.service';
import { UserService } from 'src/user/user.service';
import { roleDto } from './dto/role.dto';

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

    async addRoleToUser(dto: roleDto) {
        const { role, user } = dto
        const roleEntity = await this.rolesService.getRole(role);
        const userEntity = await this.userService.getUserByName(user)
        return await this.repository.save({ user: userEntity, role: roleEntity })
    }

    async deleteRoleRelation(dto: roleDto) {
        const { user, role } = dto

        const roleRelation = await this.repository.findOne({
            where: {
                user: {
                    username: user
                },
                role: {
                    role: role
                }
            },
            relations: ['user', 'role']
        })

        if (!roleRelation) {
            throw new BadRequestException('relation doesn`t exist')
        }

        return this.repository.delete(roleRelation)
    }

    async getUserRoles(username: string) {
        const userRoleEntity = await this.repository.find({
            where: {
                user: {
                    username: username
                }
            },
            relations: ['user', 'role']
        })
        if (!userRoleEntity) {
            throw new BadRequestException('user doesn`t exist')
        }

        const userRoles: string[] = userRoleEntity.map(userRoleEntity => userRoleEntity.role.role);
        return userRoles
    }
}
