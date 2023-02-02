import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { UsuarioDecorator } from 'src/decorator/usuario.decorator';
import { TipoUsuario } from 'src/enum/TipoUsuario';
import { StatusResponse } from 'src/generics/constants';
import { TiposDeUsuario } from 'src/guard/tipo-usuario.guard';
import { ChamadosService } from './chamados.service';
import { AtualizarChamadoDto } from './dto/atualizar-chamado.dto';
import { CriarChamadoDto } from './dto/criar-chamado.dto';
import { Chamado } from './entities/chamado.entity';

@Controller('chamados')
@ApiTags('Chamados')
@ApiBearerAuth()
export class ChamadosController {
  constructor(private readonly chamadosService: ChamadosService) {}
  @Post()
  criarChamado(
    @Body() criarChamadoDto: CriarChamadoDto,
    @UsuarioDecorator() usuario: Usuario,
  ): Promise<Chamado> {
    return this.chamadosService.criarChamado(criarChamadoDto, usuario.id);
  }

  @Get()
  listarTodos(@UsuarioDecorator() usuario: Usuario): Promise<Chamado[]> {
    return this.chamadosService.listarChamados(
      usuario.funcao,
      usuario.departamento.id,
    );
  }

  @Get(':id')
  listar(@Param('id') id: string): Promise<Chamado> {
    return this.chamadosService.findOne(id);
  }

  @Patch(':id')
  @TiposDeUsuario(TipoUsuario.ADMIN)
  atualizarChamado(
    @Param('id') id: string,
    @Body() atualizarChamadoDto: AtualizarChamadoDto,
  ): Promise<Chamado> {
    return this.chamadosService.atualizarChamado(id, atualizarChamadoDto);
  }

  @Delete(':id')
  @TiposDeUsuario(TipoUsuario.ADMIN)
  remover(@Param('id') id: string): Promise<StatusResponse> {
    return this.chamadosService.remover(id);
  }
}
