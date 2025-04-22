import { Injectable } from "@nestjs/common";
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
        return await this.answersRepository.findBy({ id: answerId })
    }
}