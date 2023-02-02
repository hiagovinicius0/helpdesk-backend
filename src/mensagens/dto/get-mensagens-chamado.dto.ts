import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetMensagensChamadoDto {
  @ApiProperty()
  @IsUUID()
  chamadoId: string;
}
