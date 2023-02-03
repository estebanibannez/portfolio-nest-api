import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CertificatesModule } from './certificates/certificates.module';
import { JobsModule } from './jobs/jobs.module';
import { CategoryModule } from './category/category.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CertificatesModule,
    JobsModule,
    CategoryModule,
    CommonModule,
    MongooseModule.forRoot(
      `mongodb+srv://ibanez:bRVJJTIe49wN1hGj@portfoliodb.d8pfr8w.mongodb.net/portfoliodb`,
    ),
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
  ],
})
export class AppModule {
  constructor() {
    console.log(
      process.env.DATABASE_USER,
      process.env.DATABASE_PASSWORD,
      process.env.DATABASE_NAME,
    );

    console.log(
      `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@portfoliodb.d8pfr8w.mongodb.net/${process.env.DATABASE_NAME}`,
    );
  }
}
