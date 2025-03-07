import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswersEntity } from './entity/answers.entity';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswersService {
    constructor(
        @InjectRepository(AnswersEntity)
        private repository: Repository<AnswersEntity>
    ) {}
    getAnswers(){
            return this.repository.find()
        }
    
    createAnswer(id: number, dto: CreateAnswerDto){
        return this.repository.save({...dto, problem: id})
    }

    async deleteAnswer(id: number){
        return await this.repository.createQueryBuilder('answerDelete')
        .delete()
        .where({id: id})
        .execute();

    }

    async updateProblem(id: number, dto: UpdateAnswerDto){
        try {
            const result = await this.repository.createQueryBuilder('problemUpdate')
            .update(AnswersEntity)
            .set(dto)
            .where({id: id})
            .execute()
            if (result.affected === 0) {
                throw new NotFoundException(`Запись с ID ${id} не найдена`);
            }
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
                } else if (error.code === '23503') { // Специфичная проверка кода ошибки
                    throw new BadRequestException(`Нарушение ограничения внешнего ключа: ${error.detail}`);
                } else {
                console.error('Ошибка при обновлении записи:', error);
                throw new InternalServerErrorException('Ошибка сервера');
                }
        }
    }
}
