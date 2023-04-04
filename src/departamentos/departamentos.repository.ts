import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateDepartamentoDto } from './dto/request/create-departamento.dto';
import { Departamento } from './entities/departamento.entity';

@Injectable()
export class DepartamentosRepository {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepo: Repository<Departamento>,
  ) {}

  criar(createDepartamentoDto: CreateDepartamentoDto): Promise<Departamento> {
    return this.departamentoRepo.save({
      nome: createDepartamentoDto.nome,
      ativo: true,
      icone: createDepartamentoDto.icone,
    });
  }

  listarTodos(): Promise<Departamento[]> {
    return this.departamentoRepo.find({ order: { id: 'ASC' } });
  }

  listarAtivos(): Promise<Departamento[]> {
    return this.departamentoRepo.find({
      where: { ativo: true },
      order: { id: 'ASC' },
    });
  }

  listarDepartamento(id: number): Promise<Departamento | null> {
    return this.departamentoRepo.findOne({ where: { id: id } });
  }

  listarDepartamentoAtivo(id: number): Promise<Departamento | null> {
    return this.departamentoRepo.findOne({ where: { id: id, ativo: true } });
  }

  update(departamento: Partial<Departamento>): Promise<Partial<Departamento>> {
    return this.departamentoRepo.save(departamento);
  }

  remove(id: number): Promise<UpdateResult> {
    return this.departamentoRepo
      .createQueryBuilder()
      .update({ ativo: false })
      .where('id = :id', { id })
      .execute();
  }
}
