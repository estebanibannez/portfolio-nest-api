import { IsDate, IsString, MinLength } from 'class-validator';

export class CertificateDto {
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener minimo 3 o más caracteres' })
  readonly name: string;
  @IsString()
  readonly description: string;
  @IsString()
  readonly category: string;
}
