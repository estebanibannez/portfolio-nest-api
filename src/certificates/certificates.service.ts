import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { CertificateDto, CertificateUpdateDto } from 'src/certificates/dto';
import { Certificate } from 'src/certificates/entities/certificate.entity';

@Injectable()
export class CertificatesService {
  constructor(
    @InjectModel(Certificate.name)
    private readonly model: Model<Certificate>,
  ) {}

  async getAll() {
    try {
      return await this.model.find({});
    } catch (error) {
      console.log('Ocurrió un error: ' + error);
    }
  }

  getById(id: number) {
    return { id: id, name: 'test' };
  }

  async create(CertificateDto) {
    try {
      const newCertificate = await this.model.create(CertificateDto);
      console.log(newCertificate);
      return newCertificate;
    } catch (error) {
      console.log('Ocurrió un error', error);
    }
  }

  async update(id: string, certificateUpdateDto: CertificateUpdateDto) {
    try {
      return await this.model.updateOne(
        { _id: id },
        { $set: certificateUpdateDto },
      );
    } catch (error) {
      console.log('Ocurrió un error', error);
    }
  }
}
