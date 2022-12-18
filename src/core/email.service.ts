import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs-extra';
import * as hbs from 'handlebars';
import * as path from 'path';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import configuration from '../config';

@Injectable()
export class EmailService {
  constructor(
    @Inject(configuration.KEY) private config: ConfigType<typeof configuration>,
  ) {}

  createTransporter() {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: this.config.email.username,
        pass: this.config.email.password,
      },
      tls: { rejectUnauthorized: false },
    });
    return transporter;
  }

  async sendMailAdvisory(user: CreateUserDto) {
    const transporter = this.createTransporter();
    try {
      const emailTemplate = await this.compile('email', user);
      await transporter.sendMail({
        from: 'Mentar Colombia <mentarcol@gmail.com>',
        to: user.correo,
        subject: 'Acabas de recibir tu ASESORÍA INICIAL',
        html: emailTemplate,
      });
    } catch (error) {
      throw new InternalServerErrorException('Problema no controlado');
    }
  }

  async compile(templateName: string, data) {
    const filePath = path.join(
      process.cwd(),
      'templates',
      `${templateName}.hbs`,
    );
    const html = await fs.readFile(filePath, 'utf8');
    return hbs.compile(html, { strict: false })(data);
  }
}
