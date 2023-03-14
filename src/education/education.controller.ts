import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { handleException } from 'src/exception/handle.exception';
import { ApiTags } from '@nestjs/swagger';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('education')
@ApiTags('Education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  async create(
    @Body() createEducationDto: CreateEducationDto,
    @Res() response,
  ) {
    try {
      const newExperience = await this.educationService.create(
        createEducationDto,
      );

      return response.status(HttpStatus.CREATED).json({
        message: 'Education has been created successfully',
        newExperience,
      });
    } catch (error) {
      handleException(error, 'education', response);
    }
  }

  @Get()
  async findAll(@Res() response) {
    try {
      const data = await this.educationService.findAll();
      return response.status(HttpStatus.OK).json({
        message: `All Education succesfully`,
        data,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseMongoIdPipe) id: string, @Res() response) {
    try {
      const data = await this.educationService.findOne(id);
      return response.status(HttpStatus.OK).json({
        message: `Education find #${id} succesfully`,
        data,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateEducationDto: UpdateEducationDto,
    @Res() response,
  ) {
    try {
      const data = await this.educationService.update(id, updateEducationDto);
      return response.status(HttpStatus.OK).json({
        message: `Education with #${id} updated succesfully`,
        data,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseMongoIdPipe) id: string, @Res() response) {
    try {
      const data = await this.educationService.remove(id);
      return response.status(HttpStatus.OK).json({
        message: `Education with #${id} has been delete succesfully`,
        data,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
}
