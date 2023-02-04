import { ApiProperty } from '@nestjs/swagger';
import { RegisterResponseDto } from 'src/auth/dto/response/register-response.dto';
import { CriarChamadoResponseDto } from './criar-chamado-response.dto';

export class ListarChamadosResponseDto extends CriarChamadoResponseDto {
  @ApiProperty()
  usuarioCriador: RegisterResponseDto;
}
