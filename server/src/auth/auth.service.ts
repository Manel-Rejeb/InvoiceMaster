import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    // TODO: TO REVIEW
    if (!userService.findByEmail('manel.rejeb@visto.com')) {
      userService.createUser({
        id: null,
        username: 'manel rejeb',
        email: 'manel.rejeb@visto.com',
        password: 'admin00',
        isActive: true,
        role: 'ADMIN',
        privilege: 'ADMIN',
      });
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException(
        'User not Found, Please veridy your information',
      );
    }

    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Passowrd does not match');
    }

    return user;
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.id };
    if (!user.isActive) {
      throw new BadRequestException('User is not active, Please contact admin');
    }
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: User): Promise<{ access_token: string }> {
    let isUserExist = await this.userService.findByEmail(user.email);

    if (isUserExist) {
      throw new BadRequestException('Email already exists');
    }

    const createdUser = await this.userService.createUser(user);

    if (createdUser) {
      return this.login(user);
    } else {
      throw new BadRequestException('Error processing request');
    }
  }

  async profile(email: string): Promise<Omit<User, 'password'>> {
    const user = await this.userService.findByEmail(email);
    const { password, ...userDataWithoutPassword } = user;
    return userDataWithoutPassword;
  }
}
