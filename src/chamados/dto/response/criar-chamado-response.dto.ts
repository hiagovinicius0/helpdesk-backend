import { ApiProperty } from '@nestjs/swagger';
import { CreateDepartamentoResponseDto } from 'src/departamentos/dto/response/create-departamentos-response.dto';

export class CriarChamadoResponseDto {
  @ApiProperty()
  departamentoResponsavel: CreateDepartamentoResponseDto;

  @ApiProperty()
  dtaExpiracao: string;

  @ApiProperty()
  dtaInsercao: string;

  @ApiProperty()
  prioridade: number;

  @ApiProperty()
  titulo: string;

  @ApiProperty()
  ultimoStatus: number;

  @ApiProperty()
  ativo: true;

  @ApiProperty()
  ordem: number;

  @ApiProperty()
  id: string;
}
