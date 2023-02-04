import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { UsuarioDecorator } from 'src/decorator/usuario.decorator';
import { TipoUsuario } from 'src/enum/TipoUsuario';
import { StatusResponse } from 'src/generics/constants';
import { StatusResponseDto } from 'src/generics/dto/status-response.dto';
import { TiposDeUsuario } from 'src/guard/tipo-usuario.guard';
import { HistoricoChamado } from 'src/historico-chamado/entities/historico-chamado.entity';
import { ChamadosService } from './chamados.service';
import { AtualizarChamadoDto } from './dto/request/atualizar-chamado.dto';
import { CriarChamadoDto } from './dto/request/criar-chamado.dto';
import { CriarChamadoResponseDto } from './dto/response/criar-chamado-response.dto';
import { ListarChamadoResponseDto } from './dto/response/listar-chamado-response.dto';
import { ListarChamadosResponseDto } from './dto/response/listar-chamados-response.dto';
import { ListarHistoricoDto } from './dto/response/listar-historico-response.dto';
import { Chamado } from './entities/chamado.entity';

@Controller('chamados')
@ApiTags('Chamados')
@ApiBearerAuth()
export class ChamadosController {
  constructor(private readonly chamadosService: ChamadosService) {}
  @Post()
  @ApiResponse({
    status: 201,
    type: CriarChamadoResponseDto,
  })
  criarChamado(
    @Body() criarChamadoDto: CriarChamadoDto,
    @UsuarioDecorator() usuario: Usuario,
  ): Promise<Chamado> {
    return this.chamadosService.criarChamado(criarChamadoDto, usuario);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: ListarChamadosResponseDto,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  listarTodos(@UsuarioDecorator() usuario: Usuario): Promise<Chamado[]> {
    return this.chamadosService.listarChamados(usuario);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: ListarChamadoResponseDto })
  @UseInterceptors(ClassSerializerInterceptor)
  listar(@Param('id') id: string): Promise<Chamado> {
    return this.chamadosService.findOne(id);
  }

  @Get(':id/historico')
  @ApiResponse({ status: 200, type: ListarHistoricoDto })
  @UseInterceptors(ClassSerializerInterceptor)
  listarHistorico(@Param('id') id: string): Promise<HistoricoChamado[]> {
    return this.chamadosService.findHistorico(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: CriarChamadoDto })
  @TiposDeUsuario(TipoUsuario.ADMIN)
  atualizarChamado(
    @Param('id') id: string,
    @Body() atualizarChamadoDto: AtualizarChamadoDto,
    @UsuarioDecorator() usuario: Usuario,
  ): Promise<Chamado> {
    return this.chamadosService.atualizarChamado(
      id,
      atualizarChamadoDto,
      usuario,
    );
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: StatusResponseDto })
  @TiposDeUsuario(TipoUsuario.ADMIN)
  remover(@Param('id') id: string): Promise<StatusResponse> {
    return this.chamadosService.remover(id);
  }
}
