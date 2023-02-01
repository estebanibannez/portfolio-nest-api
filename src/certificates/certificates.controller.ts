import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CertificateUpdateDto } from 'src/certificates/dto/certificate.dto.update';
import { handleException } from 'src/exception/handle.exception';
import { CertificatesService } from './certificates.service';
import { CertificateDto } from './dto/certificate.dto';

@Controller('certificates')
@UsePipes(ValidationPipe)
export class CertificatesController {
  constructor(private certificatesService: CertificatesService) {}
  @Get()
  async findAll(@Res() response) {
    try {
      const data = await this.certificatesService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'All Certificates data found successfully',
        data,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getById(@Res() response, @Param('id') id: string) {
    try {
      const data = await this.certificatesService.findOne(id);
      return response.status(HttpStatus.CREATED).json({
        message: `Certificate find #${id} succesfully`,
        data,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Post()
  async createCertificate(
    @Res() response,
    @Body() certificateDto: CertificateDto,
  ) {
    try {
      const newCertificate = await this.certificatesService.create(
        certificateDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Certificate has been created successfully',
        newCertificate,
      });
    } catch (error) {
      handleException(error, 'certificate', response);
    }
  }

  @Put(':id')
  async updateCertificate(
    @Res() response,
    @Param('id') id: string,
    @Body() certificateUpdateDto: CertificateUpdateDto,
  ) {
    try {
      const existingCertificate = await this.certificatesService.update(
        id,
        certificateUpdateDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Certificate has been successfully updated',
        existingCertificate,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Delete(':id')
  async deleteCertificate(@Res() response, @Param('id') id: string) {
    try {
      const deletedCertificate = await this.certificatesService.delete(id);
      console.log('controller: ', deletedCertificate);
      return response.status(HttpStatus.OK).json({
        message: 'Certificate deleted successfully',
        deletedCertificate,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
}
