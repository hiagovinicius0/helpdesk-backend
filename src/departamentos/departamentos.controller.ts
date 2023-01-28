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
import { TipoUsuario } from 'src/guard/tipo-usuario';
import { UsuarioDecorator } from 'src/decorator/usuario.decorator';
import { Usuario } from 'src/auth/entities/usuario.entity';

@Controller('departamentos')
@ApiBearerAuth()
export class DepartamentosController {
  constructor(private readonly departamentosService: DepartamentosService) {}

  @Post()
  @TiposDeUsuario(TipoUsuario.ADMIN)
  create(@Body() createDepartamentoDto: CreateDepartamentoDto) {
    return this.departamentosService.create(createDepartamentoDto);
  }

  @Get()
  findAll(@UsuarioDecorator() usuario: Usuario) {
    console.log(usuario);
    return this.departamentosService.findAll(usuario.funcao);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departamentosService.findOne(+id);
  }

  @Patch(':id')
  @TiposDeUsuario(TipoUsuario.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateDepartamentoDto: UpdateDepartamentoDto,
  ) {
    return this.departamentosService.update(+id, updateDepartamentoDto);
  }

  @Delete(':id')
  @TiposDeUsuario(TipoUsuario.ADMIN)
  remove(@Param('id') id: string) {
    return this.departamentosService.remove(+id);
  }
}
