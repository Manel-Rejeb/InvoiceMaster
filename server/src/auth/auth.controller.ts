import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {} // injecting the user service into the auth controller

  @Post('register')
  async registerUser(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }
}
