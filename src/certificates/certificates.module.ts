import { Module } from '@nestjs/common';
import { CertificatesController } from './certificates.controller';
import { CertificatesService } from './certificates.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Certificate,
  CertificateSchema,
} from 'src/certificates/entities/certificate.entity';

@Module({
  controllers: [CertificatesController],
  providers: [CertificatesService],
  imports: [
    MongooseModule.forFeature([
      { name: Certificate.name, schema: CertificateSchema },
    ]),
  ],
})
export class CertificatesModule {}
