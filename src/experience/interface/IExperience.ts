import { Document } from 'mongoose';

export interface IExperience extends Document {
    title: string;
    company: string;
    location: string;
    description: string;
    startDate: Date;
    endDate: Date;
    current: boolean;
}