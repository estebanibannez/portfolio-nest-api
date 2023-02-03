import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface IAbilities {
  name: string;
  years: number;
}

export type JobDocument = Job & Document;
@Schema()
export class Job extends Document {
  @Prop({ index: true, required: true })
  company: string;
  @Prop({ index: true, required: true })
  role: string;
  @Prop({ index: true })
  description: string;
  @Prop([])
  habilities: [IAbilities];
  @Prop()
  dateIni: Date;
  @Prop()
  dateEnd: Date;
}

export const JobSchema = SchemaFactory.createForClass(Job);
