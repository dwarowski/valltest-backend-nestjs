import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoleEntity } from '../../../entities/roles/role.entity';

@Injectable()
export class GetRolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly rolesRepository: Repository<RoleEntity>,
  ) {}

  async execute(name: string) {
    const roleEntity = await this.rolesRepository.findOneBy({ role: name });
    if (!roleEntity) {
      throw new BadRequestException('role doesn`t exist');
    }
    return roleEntity;
  }
}
