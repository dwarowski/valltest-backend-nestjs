import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/users/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class VerifyEmailService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    
    async execute(token: string) {
        if (!token) {
            throw new BadRequestException('Токен верификации отсутствует.');
          }
      
          // Поиск пользователя по токену
          const user = await this.userRepository.findOne({ where: { verificationToken: token } });
          
          if (!user) {
            throw new BadRequestException('Неверный токен верификации.');
          }
      
          if (user.isVerified) {
            return true;
          }
      
          // Обновляем пользователя: устанавливаем isVerified в true и удаляем токен
          user.isVerified = true;
          user.verificationToken = ''; // Очищаем токен
          await this.userRepository.save(user);
          return true
    }
}