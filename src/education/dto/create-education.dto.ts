import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsString } from 'class-validator';
import Degree from 'src/common/enums/degree';

export class CreateEducationDto {
  @ApiProperty({
    example: 'Nombre de la institución o casa de estudio',
  })
  @IsString()
  educationalInstitution: string;

  @ApiProperty({
    example: 'Indica el grado de estudio',
  })
  @IsEnum(Degree)
  degree: Degree;

  @ApiProperty({
    example: 'Campo de estudio o nombre de la carrera',
  })
  @IsString()
  fieldOfStudy: string;

  @ApiProperty({
    example: 'Fecha inicio en formato: yyyy-mm-dd',
  })
  @IsDateString()
  startDate: Date;

  @ApiProperty({
    example: 'Fecha termino en formato: yyyy-mm-dd',
  })
  @IsDateString()
  endDate: Date;
}
