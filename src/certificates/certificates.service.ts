import { Injectable } from '@nestjs/common';
import { CertificateDto, CertificateUpdateDto } from 'src/certificates/dto';

@Injectable()
export class CertificatesService {
  getAll() {
    return [{ id: 1, name: 'certificado 1' }];
  }

  getById(id: number) {
    return { id: id, name: 'test' };
  }

  create({ name, description, category }: CertificateDto) {
    return name;
  }

  update(id: string, certificateUpdateDto: CertificateUpdateDto) {
    return id;
  }
}
