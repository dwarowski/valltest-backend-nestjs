import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RolesUsersEntity } from '../../../entities/roles-users/roles-users.entity';
import { RemoveRoleDto } from './remove-role.dto';

@Injectable()
export class RemoveRoleService {
  constructor(
    @InjectRepository(RolesUsersEntity)
    private repository: Repository<RolesUsersEntity>,
  ) {}

  async deleteRoleRelation(dto: RemoveRoleDto) {
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
}
