import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailService } from 'src/core/email.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private emailService: EmailService,
  ) {}
  async create(dataUser: CreateUserDto) {
    try {
      const newUser = new this.userModel(dataUser);
      await newUser.save();
      await this.sendEmail(dataUser);
    } catch (error) {
      throw new InternalServerErrorException('Problema no controlado');
    }
    return {
      message: 'Usuario creado exitosamente.',
      statusCode: 201,
    };
  }

  async sendEmail(dataUser: CreateUserDto) {
    try {
      await this.emailService.sendMailAdvisory(dataUser);
    } catch (error) {
      throw new InternalServerErrorException('Problema no controlado');
    }
    return;
  }
}
