import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FavoriteTestEntity } from './entity/favorite-test.entity';

@Injectable()
export class TestFavoritesService {
    constructor(
            @InjectRepository(FavoriteTestEntity)
            private repository: Repository<FavoriteTestEntity>,
          ) {}

    getFavTestById(id: number){
        return this.repository.findOneBy({ id })
    }

    async addTestToFavorite(userId: string, testId: string){
        return 
    }
}
