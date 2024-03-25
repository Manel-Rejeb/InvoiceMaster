import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AppService {
  constructor(private usersService: UserService) {}

  async getHello(userID: number): Promise<string> {
    const user: User = await this.usersService.findUserById(userID);
    return `Hello ${JSON.stringify(user)}`;
  }
}
