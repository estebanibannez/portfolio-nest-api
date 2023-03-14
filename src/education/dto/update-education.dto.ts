import { PartialType } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import Degree from 'src/common/enums/degree';
import { CreateEducationDto } from './create-education.dto';

export class UpdateEducationDto extends PartialType(CreateEducationDto) {
    @IsString()
    @IsOptional()
    readonly educationalInstitution?: string;
    
    @IsString()
    @IsOptional()
    @IsEnum(Degree)
    readonly degree?: Degree;

    @IsString()
    @IsOptional()
    readonly fieldOfStudy?: string;

    @IsDateString()
    @IsOptional()
    startDate?: Date;

    @IsDateString()
    @IsOptional()
    endDate?: Date;
}
