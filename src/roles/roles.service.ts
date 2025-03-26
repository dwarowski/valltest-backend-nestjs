import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entity/role.entity';
import { Repository } from 'typeorm';
import { createRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private repository: Repository<RoleEntity>,
  ) {}

  async getRole(name: string) {
    const roleEntity = await this.repository.findOneBy({ role: name });
    if (!roleEntity) {
      throw new BadRequestException('role doesn`t exist');
    }

    return roleEntity;
  }

  async createRole(dto: createRoleDto) {
    return await this.repository.save(dto);
  }
  async deleteRole(name: string) {
    return await this.repository.delete({ role: name });
  }
}
