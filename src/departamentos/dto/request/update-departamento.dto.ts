import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateDepartamentoDto } from './create-departamento.dto';

export class UpdateDepartamentoDto extends PartialType(CreateDepartamentoDto) {
  @ApiProperty()
  nome: string;

  @ApiProperty()
  ativo: boolean;
}
