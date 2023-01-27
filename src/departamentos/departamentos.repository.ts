import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
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
    });
  }

  listarTodos(): Promise<Departamento[]> {
    return this.departamentoRepo.find();
  }

  listarTodosUsuario(): Promise<Departamento[]> {
    return this.departamentoRepo.find({ where: { ativo: true } });
  }

  listarDepartamento(id: number): Promise<Departamento | null> {
    return this.departamentoRepo.findOne({ where: { id: id } });
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
