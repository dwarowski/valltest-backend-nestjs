import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserService } from '../../users/user.service';

import { AddRoleToUserDto } from './add-role-to-user.dto';
import { RolesUsersEntity } from '../../../entities/roles-users/roles-users.entity';
import { GetRolesService } from '../../roles/get-role/get-roles.service';
import { GetUserRoleService } from '../get-user-role/get-user-role.service';

@Injectable()
export class AddRoleToUsersService {
  constructor(
    @Inject(UserService)
    private userService: UserService,
    @Inject(GetRolesService)
    private getRolesService: GetRolesService,
    @Inject(GetUserRoleService)
    private readonly getUserRoleService: GetUserRoleService,
    @InjectRepository(RolesUsersEntity)
    private repository: Repository<RolesUsersEntity>,
  ) {}

  async addRoleToUser(dto: AddRoleToUserDto) {
    const { role, user } = dto;
    const roleEntity = await this.getRolesService.getRole(role);
    const userEntity = await this.userService.getUserByName(user);
    const existingRoles = await this.getUserRoleService.getUserRoles(userEntity.username);

    if (existingRoles.some((existingRole) => existingRole === role)) {
      throw new ConflictException(`User already has the role: ${role}`);
    }
    return await this.repository.save({ user: userEntity, role: roleEntity });
  }
}
