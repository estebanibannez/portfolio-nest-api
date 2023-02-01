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
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100, {
    message: 'has superado el máximo de caracteres permitidos',
  })
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly category: string;

  @IsString()
  readonly url: string;

  @IsDateString()
  readonly dateIni: Date;

  @IsDateString()
  readonly dateEnd: Date;
}
