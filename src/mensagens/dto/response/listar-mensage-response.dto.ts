import { ApiProperty } from '@nestjs/swagger';
import { UsuarioResponseDto } from 'src/auth/dto/response/login-response.dto';
import { CreateMensagemResponseDto } from './create-mensagem-response.dto';

export class ListarMensagemResponseDto extends CreateMensagemResponseDto {
  @ApiProperty()
  usuario: UsuarioResponseDto;
}
