import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AnswersEntity } from "src/entities/answers/answers.entity";
import { Repository } from "typeorm";

@Injectable()
export class GetAnswerService {
    constructor(
        @InjectRepository(AnswersEntity)
        private readonly answersRepository: Repository<AnswersEntity>,
    ) {}

    async execute(answerId: number) {
        const answerEntity = await this.answersRepository.findOneBy({ id: answerId })
        if (!answerEntity) {
            throw new NotFoundException(`answer with id ${answerId} not found`)
        }
        return answerEntity
    }
}