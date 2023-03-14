import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  @ApiProperty({
    example: 'Nombre de la categoria',
  })
  name: string;
  @IsString()
  @ApiProperty({
    example: 'Descripción de la categoria',
  })
  description: string;
}
