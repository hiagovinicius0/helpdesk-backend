import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { PrioridadeChamado } from 'src/enum/PrioridadeChamado';

export class CriarChamadoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  titulo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  departamentoResponsavel: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PrioridadeChamado)
  prioridade: PrioridadeChamado;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  descricao: string;
}
