import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserService } from '../users/user.service';

import { roleDto } from './dto/role.dto';
import { RolesUsersEntity } from '../../entities/roles-users/roles-users.entity';
import { GetRolesService } from '../roles/get-role/get-roles.service';

@Injectable()
export class RolesUsersService {
  constructor(
    @Inject(UserService)
    private userService: UserService,
    @Inject(GetRolesService)
    private getRolesService: GetRolesService,
    @InjectRepository(RolesUsersEntity)
    private repository: Repository<RolesUsersEntity>,
  ) {}

  async addRoleToUser(dto: roleDto) {
    const { role, user } = dto;
    const roleEntity = await this.getRolesService.getRole(role);
    const userEntity = await this.userService.getUserByName(user);
    const existingRoles = await this.getUserRoles(userEntity.username);

    if (existingRoles.some((existingRole) => existingRole === role)) {
      throw new ConflictException(`User already has the role: ${role}`);
    }
    return await this.repository.save({ user: userEntity, role: roleEntity });
  }

  async deleteRoleRelation(dto: roleDto) {
    const { user, role } = dto;

    const roleRelation = await this.repository.findOne({
      where: {
        user: {
          username: user,
        },
        role: {
          role: role,
        },
      },
      relations: ['user', 'role'],
    });

    if (!roleRelation) {
      throw new BadRequestException('relation doesn`t exist');
    }

    return this.repository.delete(roleRelation);
  }

  async getUserRoles(username: string) {
    const userRoleEntity = await this.repository.find({
      where: {
        user: {
          username: username,
        },
      },
      relations: ['user', 'role'],
    });
    if (!userRoleEntity) {
      throw new BadRequestException('user doesn`t exist');
    }

    const userRoles: string[] = userRoleEntity.map(
      (userRoleEntity) => userRoleEntity.role.role,
    );
    return userRoles;
  }
}
