import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CertificatesModule } from './certificates/certificates.module';
import { JobsModule } from './jobs/jobs.module';
import { CategoryModule } from './category/category.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    CertificatesModule,
    JobsModule,
    CategoryModule,
    MongooseModule.forRoot('mongodb://localhost/nest-portfolio'),
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
