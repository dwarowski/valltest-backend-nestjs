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
    private readonly getUser: GetUserService,
    @Inject(GetRolesService)
    private readonly getRoles: GetRolesService,
    @Inject(GetUserRoleService)
    private readonly getUserRole: GetUserRoleService,
    @InjectRepository(RolesUsersEntity)
    private readonly rolesUsersRepository: Repository<RolesUsersEntity>,
  ) {}

  async execute(dto: AddRoleToUserDto) {
    const { role, user } = dto;
    const roleEntity = await this.getRoles.execute(role);
    const userEntity = await this.getUser.execute(user, 'id');
    const existingRoles = await this.getUserRole.execute(userEntity.id);

    if (existingRoles.some((existingRole) => existingRole === role)) {
      throw new ConflictException(`User already has the role: ${role}`);
    }
    return await this.rolesUsersRepository.save({
      user: userEntity,
      role: roleEntity,
    });
  }
}
