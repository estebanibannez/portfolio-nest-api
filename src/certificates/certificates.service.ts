import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { CertificateDto, CertificateUpdateDto } from 'src/certificates/dto';
import {
  Certificate,
  CertificateDocument,
} from 'src/certificates/entities/certificate.entity';
import { ICertificate } from 'src/certificates/interface/certificate.interface';

@Injectable()
export class CertificatesService {
  constructor(
    @InjectModel(Certificate.name)
    private readonly modelCertificates: Model<CertificateDocument>,
  ) {}

  async findAll(): Promise<ICertificate[]> {
    const allCertificates = await this.modelCertificates
      .find({})
      .populate('category');

    if (!allCertificates) {
      throw new NotFoundException(`Certificates not found`);
    }
    return allCertificates;
  }

  async findOne(id: string): Promise<ICertificate> {
    const existingCertificate = await this.modelCertificates
      .findById(id)
      .exec();
    console.log(existingCertificate);
    if (!existingCertificate) {
      throw new NotFoundException(`Certificate #${id} not found`);
    }
    return existingCertificate;
  }

  async create(CertificateDto): Promise<ICertificate> {
    const newCertificate = await this.modelCertificates.create(CertificateDto);
    return newCertificate;
  }

  async update(
    id: string,
    certificateUpdateDto: CertificateUpdateDto,
  ): Promise<ICertificate> {
    const existingCertificate = await this.modelCertificates.findByIdAndUpdate(
      id,
      certificateUpdateDto,
      { new: true },
    );
    if (!existingCertificate) {
      throw new NotFoundException(`Certificate with #${id} not found`);
    }
    return existingCertificate;
  }

  async delete(id: string): Promise<ICertificate> {
    try {
      const deletedCertificate = await this.modelCertificates.findByIdAndDelete(
        id,
      );

      if (!deletedCertificate) {
        throw new NotFoundException(`Certificate with #${id} not found`);
      }
      return deletedCertificate;
    } catch (error) {
      console.log('Ocurrió un error: ', error);
      throw new InternalServerErrorException(error);
    }
  }
}
