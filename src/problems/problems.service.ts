import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProblemsEntity } from './entity/problems.entity';
import { Repository } from 'typeorm';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(ProblemsEntity)
    private repository: Repository<ProblemsEntity>,
  ) {}

  getProblem() {
    return this.repository.find();
  }

  createProblem(id: number, dto: CreateProblemDto) {
    return this.repository.save({ ...dto, test: id });
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
        console.error('Ошибка при обновлении записи:', error);
        throw new InternalServerErrorException('Ошибка сервера');
      }
    }
  }
}
