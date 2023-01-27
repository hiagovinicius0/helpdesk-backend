import { Injectable, NotFoundException } from '@nestjs/common';
import { StatusResponse } from 'src/generics/constants';
import { DepartamentosRepository } from './departamentos.repository';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { Departamento } from './entities/departamento.entity';

@Injectable()
export class DepartamentosService {
  constructor(
    private readonly departamentoRepository: DepartamentosRepository,
  ) {}
  create(createDepartamentoDto: CreateDepartamentoDto) {
    return this.departamentoRepository.criar(createDepartamentoDto);
  }

  findAll() {
    return this.departamentoRepository.listarTodos();
  }

  async findOne(id: number) {
    const departamento = await this.departamentoRepository.listarDepartamento(
      id,
    );
    if (departamento === null) {
      throw new NotFoundException('Departamento não encontrado');
    }
    return departamento;
  }

  async update(id: number, updateDepartamentoDto: UpdateDepartamentoDto) {
    //buscar o usuario
    const usuario = await this.departamentoRepository.listarDepartamento(id);
    //se não existe da erro
    if (usuario === null) {
      throw new NotFoundException('Departamento não encontrado!');
    }

    for (const key in updateDepartamentoDto) {
      usuario[key] = updateDepartamentoDto[key];
    }

    return this.departamentoRepository.update(usuario);
  }

  async remove(id: number): Promise<StatusResponse> {
    await this.departamentoRepository.remove(id);
    return { status: 'OK' };
  }
}
