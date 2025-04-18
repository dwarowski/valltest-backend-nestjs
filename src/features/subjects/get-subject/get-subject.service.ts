import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SubjectEntity } from "src/entities/subjects/subject.entity";
import { Repository } from "typeorm";

@Injectable()
export class GetSubjectService {
  constructor(
    @InjectRepository(SubjectEntity)
    private readonly subjectRepository: Repository<SubjectEntity>,
  ) {}

  async execute(subjectName: string){
    const subject = await this.subjectRepository.findOne({
        where: { subjectName: subjectName },
      });
      if (!subject) {
        throw new NotFoundException(
          `Subject with Name: ${subjectName} not found`,
        );
      }
      return subject
  }
  
}