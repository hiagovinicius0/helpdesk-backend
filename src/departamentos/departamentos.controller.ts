import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DepartamentosService } from './departamentos.service';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TiposDeUsuario } from 'src/guard/tipo-usuario.guard';
import { UsuarioDecorator } from 'src/decorator/usuario.decorator';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { Departamento } from './entities/departamento.entity';
import { StatusResponse } from 'src/generics/constants';
import { TipoUsuario } from 'src/enum/TipoUsuario';

@Controller('departamentos')
@ApiBearerAuth()
export class DepartamentosController {
  constructor(private readonly departamentosService: DepartamentosService) {}

  @Post()
  @TiposDeUsuario(TipoUsuario.ADMIN)
  criar(
    @Body() createDepartamentoDto: CreateDepartamentoDto,
  ): Promise<Departamento> {
    return this.departamentosService.create(createDepartamentoDto);
  }

  @Get()
  listarTodos(@UsuarioDecorator() usuario: Usuario): Promise<Departamento[]> {
    return this.departamentosService.findAll(usuario.funcao);
  }

  @Get(':id')
  listar(@Param('id') id: string): Promise<Departamento> {
    return this.departamentosService.findOne(+id);
  }

  @Patch(':id')
  @TiposDeUsuario(TipoUsuario.ADMIN)
  atualizar(
    @Param('id') id: string,
    @Body() updateDepartamentoDto: UpdateDepartamentoDto,
  ): Promise<Departamento> {
    return this.departamentosService.update(+id, updateDepartamentoDto);
  }

  @Delete(':id')
  @TiposDeUsuario(TipoUsuario.ADMIN)
  remover(@Param('id') id: string): Promise<StatusResponse> {
    return this.departamentosService.remove(+id);
  }
}
