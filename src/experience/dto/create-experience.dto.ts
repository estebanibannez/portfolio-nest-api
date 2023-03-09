import { ApiProperty } from '@nestjs/swagger';
import { isDate, IsDateString, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateExperienceDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, {
    message: 'El titulo de la experiencia debe tener mas de 2 caracteres',
  })
  @ApiProperty({ example: 'Titulo' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2, {
    message: 'El nombre de la empresa debe tener minimo 2 o más caracteres',
  })
  @ApiProperty({ example: 'Nombre de la empresa' })
  company: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2, {
    message: 'La ubicación debe tener mas de 2 caracteres',
  })
  @ApiProperty({ example: 'Ubicación del puesto' })
  location: string;

  @IsString()
  @IsNotEmpty()

  @MinLength(2, {
    message: 'Descripción del puesto laboral',
  })
  @ApiProperty({ example: 'Descripcioón del puesto' })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Fecha inicio en formato: yyyy-mm-dd',
  })
  @IsDateString()
  startDate: string;


  @ApiProperty({
    example: 'Fecha termino en formato: yyyy-mm-dd',
  })
  @IsDateString()
  @IsString()
  @IsNotEmpty()
  endDate: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  current: string;
}
