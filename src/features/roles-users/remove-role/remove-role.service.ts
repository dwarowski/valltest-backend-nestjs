import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async execute(dto: RemoveRoleDto): Promise<void> {
    const { userId, role } = dto;

    const roleRelation = await this.rolesUsersRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        role: {
          role: role,
        },
      },
    });

    if (!roleRelation) {
      throw new BadRequestException('relation doesn`t exist');
    }

    const result = await this.rolesUsersRepository.delete(roleRelation);

    if (result.affected === 0) {
      throw new NotFoundException(`Role with name: ${dto.role} not found`);
    }
  }
}
