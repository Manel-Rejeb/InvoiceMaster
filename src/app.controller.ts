import { Controller, Get } from '@nestjs/common';
import { User } from 'src/auth/decorators/user.decorator';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  async getHello(@User() user): Promise<string> {
    return await this.appService.getHello(user.id);
  }
}
