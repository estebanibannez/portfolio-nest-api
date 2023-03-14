import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Education,
  EducationSchema,
} from 'src/education/entities/education.entity';

@Module({
  controllers: [EducationController],
  providers: [EducationService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Education.name,
        schema: EducationSchema,
      },
    ]),
  ],
})
export class EducationModule {}
