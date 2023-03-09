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
} from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { handleException } from 'src/exception/handle.exception';
import { ApiTags } from '@nestjs/swagger';

@Controller('experience')
//Decorador para agrupar endpoints en swagger
@ApiTags('Experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Post()
 async create(@Res() response, @Body() createExperienceDto: CreateExperienceDto) {
    try {
      const newExperience = await this.experienceService.create(createExperienceDto);

      return response.status(HttpStatus.CREATED).json({
        message: 'Experience has been created successfully',
        newExperience,
      });
    } catch (error) {
      handleException(error, 'experience', response);
    }
  }

  @Get()
  findAll() {
    return this.experienceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.experienceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ) {
    return this.experienceService.update(+id, updateExperienceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.experienceService.remove(+id);
  }
}
