import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDepartamentoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nome: string;
}
