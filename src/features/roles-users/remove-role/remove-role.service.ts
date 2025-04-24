import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RolesUsersEntity } from '../../../entities/roles-users/roles-users.entity';
import { RemoveRoleDto } from './remove-role.dto';

@Injectable()
export class RemoveRoleService {
  constructor(
    @InjectRepository(RolesUsersEntity)
    private readonly rolesUsersRepository: Repository<RolesUsersEntity>,
  ) {}

  async execute(dto: RemoveRoleDto) {
    const { user, role } = dto;

    const roleRelation = await this.rolesUsersRepository.findOne({
      where: {
        user: {
          username: user,
        },
        role: {
          role: role,
        },
      },
    });

    if (!roleRelation) {
      throw new BadRequestException('relation doesn`t exist');
    }

    return this.rolesUsersRepository.delete(roleRelation);
  }
}
