import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RatingEntity } from './entity/rating.entity';

@Injectable()
export class RatingService {
    constructor(
            @InjectRepository(RatingEntity)
            private repository: Repository<RatingEntity>,
          ) {}

    getRatingById(id: number){
        return this.repository.findOneBy({ id })
    }
}
