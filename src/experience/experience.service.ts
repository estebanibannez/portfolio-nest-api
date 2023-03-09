import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Experience, ExperienceDocument } from 'src/experience/entities/experience.entity';
import { IExperience } from 'src/experience/interface/IExperience';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperienceService {

  constructor(
    @InjectModel(Experience.name)
    private readonly modelExperience: Model<ExperienceDocument>,
  ) {}
  
  async create(createExperienceDto: CreateExperienceDto) : Promise<IExperience>{
    const newExperience = await this.modelExperience.create(createExperienceDto);
    return newExperience;
  }

  async findAll(): Promise<IExperience[]> {
    const AllExperience = await this.modelExperience
      .find({});

    if (!AllExperience) {
      throw new NotFoundException(`Experiences not found`);
    }
    return AllExperience;
  }

  findOne(id: number) {
    return `This action returns a #${id} experience`;
  }

  update(id: number, updateExperienceDto: UpdateExperienceDto) {
    return `This action updates a #${id} experience`;
  }

  remove(id: number) {
    return `This action removes a #${id} experience`;
  }
}
