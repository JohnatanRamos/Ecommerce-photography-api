import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(dataUser: CreateUserDto) {
    try {
      const newUser = new this.userModel(dataUser);
      await newUser.save();
    } catch (error) {
      console.log(error);
    }
    return 'This action adds a new user';
  }
}
