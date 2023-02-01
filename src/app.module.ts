import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CertificatesModule } from './certificates/certificates.module';
import { JobsModule } from './jobs/jobs.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    CertificatesModule,
    JobsModule,
    CategoryModule,
    MongooseModule.forRoot('mongodb://localhost/nest-portfolio'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
