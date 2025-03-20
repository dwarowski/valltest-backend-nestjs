import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesUsersEntity } from './entity/roles-users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesUsersService {
        constructor(
            @InjectRepository(RolesUsersEntity)
            private repository: Repository<RolesUsersEntity>,
        ) { }


}
