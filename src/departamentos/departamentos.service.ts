import { Injectable, NotFoundException } from '@nestjs/common';
import { TipoUsuario } from 'src/enum/TipoUsuario';
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
  create(createDepartamentoDto: CreateDepartamentoDto): Promise<Departamento> {
    return this.departamentoRepository.criar(createDepartamentoDto);
  }

  findAll(funcao: TipoUsuario): Promise<Departamento[]> {
    if (funcao === TipoUsuario.ADMIN) {
      return this.departamentoRepository.listarTodos();
    }

    return this.departamentoRepository.listarAtivos();
  }

  async findOne(id: number): Promise<Departamento> {
    const departamento = await this.departamentoRepository.listarDepartamento(
      id,
    );

    if (departamento === null) {
      throw new NotFoundException('Departamento não encontrado');
    }

    return departamento;
  }

  async update(
    id: number,
    updateDepartamentoDto: UpdateDepartamentoDto,
  ): Promise<Departamento> {
    const departamento = await this.departamentoRepository.listarDepartamento(
      id,
    );

    if (departamento === null) {
      throw new NotFoundException('Departamento não encontrado!');
    }

    for (const key in updateDepartamentoDto) {
      departamento[key] = updateDepartamentoDto[key];
    }

    await this.departamentoRepository.update(departamento);

    return this.departamentoRepository.listarDepartamento(id);
  }

  async remove(id: number): Promise<StatusResponse> {
    await this.departamentoRepository.remove(id);

    return { status: 'OK' };
  }
}
