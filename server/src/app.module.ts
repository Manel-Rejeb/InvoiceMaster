import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtGuard } from './auth/guard/jwt.guard';
import { ArticlesModule } from './articles/articles.module';
import { CustomersModule } from './customers/customers.module';
import { InvoicesModule } from './invoices/invoices.module';
import { OrganizationModule } from './organization/organization.module';
import { TaxesModule } from './taxes/taxes.module';
import { ProjectsModule } from './projects/projects.module';
import { EstimateModule } from './estimate/estimate.module';
import { ItemModule } from './item/item.module';
import { ContactPersonModule } from './contact-person/contact-person.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { SettingsModule } from './settings/settings.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'invoice-management-internship',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    /* Start Modules */
    AuthModule,
    UserModule,
    ArticlesModule,
    CustomersModule,
    InvoicesModule,
    OrganizationModule,
    TaxesModule,
    ProjectsModule,
    EstimateModule,
    ItemModule,
    ContactPersonModule,
    FileUploadModule,
    SettingsModule,
    StripeModule,

    /* End Modules */
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
