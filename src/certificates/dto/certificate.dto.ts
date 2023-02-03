import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CertificateDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message: 'El nombre del certificado debe tener minimo 3 o más caracteres',
  })
  @ApiProperty({ example: 'Nombre para el certificado' })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100, {
    message: 'has superado el máximo de caracteres permitidos',
  })
  @ApiProperty({ example: 'Descripción para el certificado' })
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Mongo id de la categoria a la cual pertenece el certificado',
  })
  readonly category: string;

  @ApiProperty({
    example: 'Url de la imagen del certificado',
  })
  @IsString()
  readonly url: string;

  @ApiProperty({
    example: 'Fecha inicio del curso en formato: yyyy-mm-dd',
  })
  @IsDateString()
  readonly dateIni: Date;

  @ApiProperty({
    example: 'Fecha termino del curso en formato: yyyy-mm-dd',
  })
  @IsDateString()
  readonly dateEnd: Date;
}
