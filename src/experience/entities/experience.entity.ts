import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ExperienceDocument = Experience & Document; 

@Schema()
export class Experience extends Document {
    @Prop({
        unique: true,
        index: true,
        required: true,
    })
    title: string;
    
    @Prop()
    company: string;
    
    @Prop()
    location: string;
    
    @Prop()
    description: string;
    
    @Prop()
    startDate: Date;
    
    @Prop()
    endDate: Date;
    
    @Prop()
    current: boolean;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);
