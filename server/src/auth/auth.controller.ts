import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

import { User } from 'src/user/entities/user.entity';
import { Public } from './decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Request() req,
  ): Promise<{ access_token: string } | BadRequestException> {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(
    @Body() user: User,
  ): Promise<{ access_token: string } | BadRequestException> {
    return await this.authService.register(user);
  }

  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
