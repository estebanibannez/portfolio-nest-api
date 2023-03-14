import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema } from '@nestjs/mongoose';
import Gradee from 'src/common/enums/degree';

export type EducationDocument = Education & Document;

@Schema()
export class Education {
  @Prop()
  educationalInstitution: string;

  @Prop()
  degree: string;

  @Prop()
  fieldOfStudy: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  grade: Gradee;
}

export const EducationSchema = SchemaFactory.createForClass(Education);
