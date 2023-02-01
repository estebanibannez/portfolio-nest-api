import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';

@Schema()
export class Certificate extends Document {
  @Prop({
    unique: true,
    index: true,
    required: true,
  })
  name: string;

  @Prop()
  description: string;

  // inside the class definition
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop()
  url: string;

  @Prop({ required: true })
  dateIni: Date;

  @Prop({ required: true })
  dateEnd: Date;
}

export const CertificateSchema = SchemaFactory.createForClass(Certificate);
