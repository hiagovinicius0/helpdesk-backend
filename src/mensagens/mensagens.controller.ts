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
import { CreateMensagemDto } from './dto/create-mensagem.dto';
import { ApiTags } from '@nestjs/swagger';
import { UsuarioDecorator } from 'src/decorator/usuario.decorator';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { Mensagem } from './entities/mensagem.entity';
import { GetMensagensChamadoDto } from './dto/get-mensagens-chamado.dto';

@Controller('mensagens')
@ApiTags('Mensagens')
export class MensagensController {
  constructor(private readonly mensagensService: MensagensService) {}

  @Post()
  create(
    @Body() createMensagemDto: CreateMensagemDto,
    @UsuarioDecorator() usuario: Usuario,
  ): Promise<Mensagem> {
    return this.mensagensService.create(createMensagemDto, usuario);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  mensagensChamado(
    @Query() getMensagensChamadoDto: GetMensagensChamadoDto,
  ): Promise<Mensagem[]> {
    return this.mensagensService.mensagensChamado(getMensagensChamadoDto);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id') id: string): Promise<Mensagem> {
    return this.mensagensService.findOne(id);
  }
}
