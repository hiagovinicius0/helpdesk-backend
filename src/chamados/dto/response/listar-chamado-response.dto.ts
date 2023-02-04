import { ApiProperty } from '@nestjs/swagger';
import { ListarMensagemResponseDto } from 'src/mensagens/dto/response/listar-mensage-response.dto';
import { ListarChamadosResponseDto } from './listar-chamados-response.dto';

export class ListarChamadoResponseDto extends ListarChamadosResponseDto {
  @ApiProperty({ type: [ListarMensagemResponseDto] })
  mensagens: ListarMensagemResponseDto[];
}
