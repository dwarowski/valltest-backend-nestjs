import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesUsersEntity } from './entity/roles-users.entity';
import { Repository } from 'typeorm';
import { RolesService } from 'src/roles/roles.service';
import { UserService } from 'src/user/user.service';
import { assignRoleDto } from './dto/assign-role.dto';
import { removeRelationDto } from './dto/remove-relation.dto';

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

    async addRoleToUser(dto: assignRoleDto) {
        const { role, user } = dto
        const roleEntity = await this.rolesService.getRole(role);

        if (!roleEntity) {
            throw new BadRequestException('role doesn`t exist')
        }

        const userEntity = await this.userService.getUserByName(user)

        return await this.repository.save({ user: userEntity, role: roleEntity })
    }

    async deleteRoleRelation(dto: removeRelationDto) {
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
}
