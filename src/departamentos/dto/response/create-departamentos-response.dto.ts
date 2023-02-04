import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartamentoResponseDto {
  @ApiProperty()
  nome: string;

  @ApiProperty()
  ativo: boolean;

  @ApiProperty()
  id: number;
}
