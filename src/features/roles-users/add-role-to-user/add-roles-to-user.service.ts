import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AddRoleToUserDto } from './add-role-to-user.dto';
import { RolesUsersEntity } from '../../../entities/roles-users/roles-users.entity';
import { GetRolesService } from '../../roles/get-role/get-roles.service';
import { GetUserRoleService } from '../get-user-role/get-user-role.service';
import { GetUserService } from 'src/features/users/get-user/get-user.service';

@Injectable()
export class AddRoleToUsersService {
  constructor(
    @Inject(GetUserService)
    private readonly getUserByName: GetUserService,
    @Inject(GetRolesService)
    private readonly getRolesService: GetRolesService,
    @Inject(GetUserRoleService)
    private readonly getUserRoleService: GetUserRoleService,
    @InjectRepository(RolesUsersEntity)
    private readonly repository: Repository<RolesUsersEntity>,
  ) {}

  async addRoleToUser(dto: AddRoleToUserDto) {
    const { role, user } = dto;
    const roleEntity = await this.getRolesService.getRole(role);
    const userEntity = await this.getUserByName.execute(user, "username");
    const existingRoles = await this.getUserRoleService.getUserRoles(
      userEntity.username,
    );

    if (existingRoles.some((existingRole) => existingRole === role)) {
      throw new ConflictException(`User already has the role: ${role}`);
    }
    return await this.repository.save({ user: userEntity, role: roleEntity });
  }
}
