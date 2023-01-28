import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { UsuarioDecorator } from 'src/decorator/usuario.decorator';
import { ChamadosService } from './chamados.service';
import { CriarChamadoDto } from './dto/criar-chamado.dto';

@Controller('chamados')
@ApiTags('Chamados')
@ApiBearerAuth()
export class ChamadosController {
  constructor(private readonly chamadosService: ChamadosService) {}
  @Post()
  criarChamado(
    @Body() criarChamadoDto: CriarChamadoDto,
    @UsuarioDecorator() usuario: Usuario,
  ) {
    return this.chamadosService.criarChamado(criarChamadoDto, usuario.id);
  }
}
