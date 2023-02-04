import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
  Param,
} from '@nestjs/common';
import { MensagensService } from './mensagens.service';
import { CreateMensagemDto } from './dto/request/create-mensagem.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsuarioDecorator } from 'src/decorator/usuario.decorator';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { Mensagem } from './entities/mensagem.entity';
import { GetMensagensChamadoDto } from './dto/request/get-mensagens-chamado.dto';
import { CreateMensagemResponseDto } from './dto/response/create-mensagem-response.dto';
import { ListarMensagemResponseDto } from './dto/response/listar-mensage-response.dto';

@Controller('mensagens')
@ApiTags('Mensagens')
@ApiBearerAuth()
export class MensagensController {
  constructor(private readonly mensagensService: MensagensService) {}

  @Post()
  @ApiResponse({
    status: 200,
    type: CreateMensagemResponseDto,
  })
  create(
    @Body() createMensagemDto: CreateMensagemDto,
    @UsuarioDecorator() usuario: Usuario,
  ): Promise<Mensagem> {
    return this.mensagensService.create(createMensagemDto, usuario);
  }

  @Get()
  @ApiResponse({ status: 200, type: [ListarMensagemResponseDto] })
  @UseInterceptors(ClassSerializerInterceptor)
  mensagensChamado(
    @Query() getMensagensChamadoDto: GetMensagensChamadoDto,
  ): Promise<Mensagem[]> {
    return this.mensagensService.mensagensChamado(getMensagensChamadoDto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: ListarMensagemResponseDto })
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id') id: string): Promise<Mensagem> {
    return this.mensagensService.findOne(id);
  }
}
