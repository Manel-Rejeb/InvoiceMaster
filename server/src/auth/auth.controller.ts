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
import { Public } from 'src/shared/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@Public()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local')) //stratégie locale pour l'authentification
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

  @UseGuards(AuthGuard('jwt')) //stratégie jwt pour l'authentification
  @Get('profile')
  async getProfile(@Request() req): Promise<Omit<User, 'password'>> {
    return this.authService.profile(req.user.email);
  }
}
