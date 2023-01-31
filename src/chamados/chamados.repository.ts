import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Chamado } from './entities/chamado.entity';

@Injectable()
export class ChamadosRepository {
  constructor(
    @InjectRepository(Chamado)
    private readonly chamadoRepo: Repository<Chamado>,
  ) {}

  salvar(chamado: Partial<Chamado>): Promise<Chamado> {
    return this.chamadoRepo.save(chamado);
  }

  listar(chamadoId: number): Promise<Chamado | null> {
    return this.chamadoRepo.findOne({ where: { id: chamadoId } });
  }

  listarTodos(): Promise<Chamado[]> {
    return this.chamadoRepo.find();
  }

  listarApenasDepartamento(departamentoId: number): Promise<Chamado[]> {
    return this.chamadoRepo.find({
      where: { departamentoResponsavel: departamentoId },
    });
  }

  remove(id: number): Promise<UpdateResult> {
    return this.chamadoRepo
      .createQueryBuilder()
      .update({ ativo: false })
      .where('id = :id', { id })
      .execute();
  }
}
