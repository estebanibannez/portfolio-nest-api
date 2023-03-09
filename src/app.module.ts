import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CertificatesModule } from './certificates/certificates.module';
import { JobsModule } from './jobs/jobs.module';
import { CategoryModule } from './category/category.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { ExperienceModule } from './experience/experience.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    CertificatesModule,
    JobsModule,
    CategoryModule,
    ExperienceModule,
    CommonModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@portfoliodb.d8pfr8w.mongodb.net/${process.env.DATABASE_NAME}`,
    ),
  ],
})
export class AppModule {
  constructor() {}
}
