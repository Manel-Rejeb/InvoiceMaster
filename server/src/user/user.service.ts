import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    const oldPassword = user.password;
    const hashPassword = await bcrypt.hash(
      oldPassword,
      process.env.PASSWORD_SALT || 10,
    );
    user.password = hashPassword;
    const userData = await this.userRepository.create(user);
    return this.userRepository.save(userData);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUserById(id: number): Promise<User> {
    const userData = await this.userRepository.findOneBy({ id });
    if (!userData) {
      throw new NotFoundException('User Not Found');
    }
    return userData;
  }

  async updateUser(id: number, user: User): Promise<User> {
    const userData = await this.userRepository.findOneBy({ id });
    if (!userData) {
      throw new NotFoundException('User not found');
    }
    const updatedUser = this.userRepository.merge(userData, user);
    return await this.userRepository.save(updatedUser);
  }

  async removeUser(id: number): Promise<User> {
    const userData = await this.userRepository.findOneBy({ id });
    if (!userData) {
      throw new NotFoundException('User not found');
    }
    return await this.userRepository.remove(userData);
  }
}

// findOneBy({id}) =>  sepcify Field to query
// findBy({id}) => returns an array of entity
