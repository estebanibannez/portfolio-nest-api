import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  EducationDocument,
  Education,
} from 'src/education/entities/education.entity';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Injectable()
export class EducationService {
  constructor(
    @InjectModel(Education.name)
    private readonly modelEducation: Model<EducationDocument>,
  ) {}
  async create(
    createEducationDto: CreateEducationDto,
  ): Promise<EducationDocument> {
    const newEducation = await this.modelEducation.create(createEducationDto);
    return newEducation;
  }

  async findAll() {
    const response = await this.modelEducation.find().sort({ endDate: 'desc' });

    if (!response) {
      throw new NotFoundException(`education not found`);
    }
    return response;
  }

  async findOne(id: string) {
    const response = await this.modelEducation.findById(id).exec();

    if (!response) {
      throw new NotFoundException(`education by id not found`);
    }
    return response;
  }

  async update(
    id: string,
    updateEducationDto: UpdateEducationDto,
  ): Promise<EducationDocument> {
    const response = await this.modelEducation.findByIdAndUpdate(
      id,
      updateEducationDto,
      { new: true },
    );
    if (!response) {
      throw new NotFoundException(`Education with #${id} not found`);
    }
    return response;
  }

  async remove(id: string) {
    const response = await this.modelEducation.findByIdAndRemove(id, {
      new: true,
    });
    if (!response) {
      throw new NotFoundException(`Education with #${id} not found`);
    }
    return response;
  }
}
