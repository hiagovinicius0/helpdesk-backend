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
import { CreateDepartamentoDto } from './dto/request/create-departamento.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TiposDeUsuario } from 'src/guard/tipo-usuario.guard';
import { UsuarioDecorator } from 'src/decorator/usuario.decorator';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { Departamento } from './entities/departamento.entity';
import { StatusResponse } from 'src/generics/constants';
import { TipoUsuario } from 'src/enum/TipoUsuario';
import { UpdateDepartamentoDto } from './dto/request/update-departamento.dto';
import { CreateDepartamentoResponseDto } from './dto/response/create-departamentos-response.dto';
import { StatusResponseDto } from 'src/generics/dto/status-response.dto';

@Controller('departamentos')
@ApiBearerAuth()
@ApiTags('Departamentos')
export class DepartamentosController {
  constructor(private readonly departamentosService: DepartamentosService) {}

  @Post()
  @TiposDeUsuario(TipoUsuario.ADMIN)
  @ApiResponse({
    status: 201,
    type: CreateDepartamentoResponseDto,
  })
  criar(
    @Body() createDepartamentoDto: CreateDepartamentoDto,
  ): Promise<Departamento> {
    return this.departamentosService.create(createDepartamentoDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: [CreateDepartamentoResponseDto],
  })
  listarTodos(@UsuarioDecorator() usuario: Usuario): Promise<Departamento[]> {
    return this.departamentosService.findAll(usuario.funcao);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: CreateDepartamentoResponseDto,
  })
  listar(@Param('id') id: string): Promise<Departamento> {
    return this.departamentosService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    type: CreateDepartamentoResponseDto,
  })
  @TiposDeUsuario(TipoUsuario.ADMIN)
  atualizar(
    @Param('id') id: string,
    @Body() updateDepartamentoDto: UpdateDepartamentoDto,
  ): Promise<Departamento> {
    return this.departamentosService.update(+id, updateDepartamentoDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    type: StatusResponseDto,
  })
  @TiposDeUsuario(TipoUsuario.ADMIN)
  remover(@Param('id') id: string): Promise<StatusResponse> {
    return this.departamentosService.remove(+id);
  }
}
