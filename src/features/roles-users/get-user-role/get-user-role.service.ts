import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RolesUsersEntity } from '../../../entities/roles-users/roles-users.entity';

@Injectable()
export class GetUserRoleService {
  constructor(
    @InjectRepository(RolesUsersEntity)
    private readonly repository: Repository<RolesUsersEntity>,
  ) { }

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
