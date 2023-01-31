import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CertificateUpdateDto } from 'src/certificates/dto/certificate.dto.update';
import { CertificatesService } from './certificates.service';
import { CertificateDto } from './dto/certificate.dto';

@Controller('certificates')
@UsePipes(ValidationPipe)
export class CertificatesController {
  constructor(private certificatesService: CertificatesService) {}
  @Get()
  getAll() {
    return this.certificatesService.getAll();
  }

  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.certificatesService.getById(id);
  }

  @Post()
  createCertificate(@Body() certificateDto: CertificateDto) {
    return this.certificatesService.create(certificateDto);
  }

  @Patch(':id')
  updateCertificate(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() certificateUpdateDto: CertificateUpdateDto,
  ) {
    return this.certificatesService.update(id, certificateUpdateDto);
  }

  @Delete(':id')
  deleteCertificate(@Param('id', ParseIntPipe) id: number) {
    return id;
  }
}
