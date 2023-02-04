import { ApiProperty } from '@nestjs/swagger';

export class CreateMensagemResponseDto {
  @ApiProperty()
  descricao: string;

  @ApiProperty()
  horario: string;

  @ApiProperty()
  id: string;
}
