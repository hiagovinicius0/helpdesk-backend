import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { StatusChamado } from 'src/enum/StatusChamado';
import { CriarChamadoDto } from './criar-chamado.dto';

export class AtualizarChamadoDto extends PartialType(CriarChamadoDto) {
  @ApiProperty({ type: 'enum', enum: StatusChamado })
  ultimoStatus: StatusChamado;
}
