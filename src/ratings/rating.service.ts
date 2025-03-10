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

    async getRatingsByTestId(id: number): Promise<string>{
        const [ratings, total] = await this.repository.createQueryBuilder('ratings')
        .where({ test: id })
        .getManyAndCount();

        let averageTestRating: number = 0;
        ratings.forEach(ratingElement => {
            averageTestRating += ratingElement.rating
        });

        return (averageTestRating / total).toFixed(1)
    }
}
