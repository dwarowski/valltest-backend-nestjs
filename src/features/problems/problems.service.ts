import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { ProblemsEntity } from '../../entities/problems/problems.entity';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(ProblemsEntity)
    private repository: Repository<ProblemsEntity>,
  ) {}

  getProblem() {
    return this.repository.find();
  }

  async createProblem(id: number, dto: CreateProblemDto) {
    return await this.repository.save({ ...dto, test: id });
  }

  async deleteProblem(id: number) {
    return await this.repository
      .createQueryBuilder('problemDelete')
      .delete()
      .where({ id: id })
      .execute();
  }

  async updateProblem(id: number, dto: UpdateProblemDto) {
    try {
      const result = await this.repository
        .createQueryBuilder('problemUpdate')
        .update(ProblemsEntity)
        .set(dto)
        .where({ id: id })
        .execute();
      if (result.affected === 0) {
        throw new NotFoundException(`Запись с ID ${id} не найдена`);
      }
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      } else if (error.code === '23503') {
        // Специфичная проверка кода ошибки
        throw new BadRequestException(
          `Нарушение ограничения внешнего ключа: ${error.detail}`,
        );
      } else {
        throw new InternalServerErrorException('Ошибка сервера');
      }
    }
  }
}
