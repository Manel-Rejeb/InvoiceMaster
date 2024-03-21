import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { UserModule } from './user/user.module';

@Module({
  imports: [
    /* init type orm database connection */
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'invoice-management-internship',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    /* Start Modules */
    UserModule,
    /* End Modules */
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
