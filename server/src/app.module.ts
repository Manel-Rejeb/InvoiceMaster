import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule], // access to .env file in the root of the project
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
