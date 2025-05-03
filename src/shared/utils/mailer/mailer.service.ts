import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendVerificationEmail(
    email: string,
    verificationToken: string,
  ): Promise<void> {
    const frontendUrl = this.configService.get('FRONTEND_URL'); // URL вашего фронтенда
    const verificationLink = `${frontendUrl}/verify-email?token=${verificationToken}`; // URL для верификации

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Подтверждение электронной почты',
        template: 'confirmation', // Имя шаблона (confirmation.hbs, confirmation.ejs, confirmation.pug)
        context: {
          name: email.split('@')[0], // Имя пользователя (например, часть до @)
          url: verificationLink,
        },
      });
      this.logger.log(`Email отправлен на ${email}`);
    } catch (error) {
      this.logger.error(`Ошибка при отправке email на ${email}:`, error);
      throw new Error(`Не удалось отправить письмо для ${email}`); // Перебрасываем ошибку
    }
  }
}
