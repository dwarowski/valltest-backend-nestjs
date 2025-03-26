import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { SubjectEntity } from './entity/subject.entity';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectEntity)
    private readonly subjectRepository: Repository<SubjectEntity>,
  ) {}

  // Получить все предметы
  async findAll(): Promise<SubjectEntity[]> {
    return this.subjectRepository.find();
  }

  // Создать предмет
  async create(subjectData: CreateSubjectDto): Promise<SubjectEntity> {
    const subject = this.subjectRepository.create(subjectData);
    return this.subjectRepository.save(subject);
  }

  // Обновить предмет
  async update(
    id: number,
    updateData: UpdateSubjectDto,
  ): Promise<SubjectEntity> {
    const subject = await this.subjectRepository.findOne({ where: { id } });
    if (!subject) {
      throw new NotFoundException(`Subject with ID ${id} not found`);
    }
    Object.assign(subject, updateData); // Обновляем только переданные поля
    return this.subjectRepository.save(subject);
  }

  // Удалить предмет
  async delete(id: number): Promise<void> {
    const result = await this.subjectRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Subject with ID ${id} not found`);
    }
  }

  // async getSubjectById(id: number) {
  //   return await this.repository.createQueryBuilder('subjectId')
  //       .where({ id: id })
  //       .getOne()
  // }
}
