import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { createRoleDto } from './create-role.dto';
import { RoleEntity } from '../../../entities/roles/role.entity';

@Injectable()
export class CreateRolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private repository: Repository<RoleEntity>,
  ) {}
  async createRole(dto: createRoleDto) {
    return await this.repository.save(dto);
  }
}
