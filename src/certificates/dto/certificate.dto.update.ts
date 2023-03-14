import {
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CertificateUpdateDto {
  @IsUUID()
  @IsOptional()
  readonly id?: string;

  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsOptional()
  @IsString()
  readonly url: string;

  @IsString()
  @IsOptional()
  readonly category?: string;
}
