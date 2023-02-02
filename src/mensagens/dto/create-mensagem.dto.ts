import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateMensagemDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  descricao: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  chamadoId: string;
}
