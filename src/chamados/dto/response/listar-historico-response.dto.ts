import { ApiProperty } from '@nestjs/swagger';
import { UsuarioResponseDto } from 'src/auth/dto/response/login-response.dto';
import { ListarMensagemResponseDto } from 'src/mensagens/dto/response/listar-mensage-response.dto';
import { CriarChamadoDto } from '../request/criar-chamado.dto';

export class ListarHistoricoDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  status: number;

  @ApiProperty()
  prioridade: number;

  @ApiProperty()
  tipoHistorico: number;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  mensagem: ListarMensagemResponseDto;

  @ApiProperty()
  usuario: UsuarioResponseDto;

  @ApiProperty()
  chamado: CriarChamadoDto;
}
