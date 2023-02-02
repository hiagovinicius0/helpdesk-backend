import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusChamado } from 'src/enum/StatusChamado';
import { Not, Repository, UpdateResult } from 'typeorm';
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

  listar(chamadoId: string): Promise<Chamado | null> {
    return this.chamadoRepo.findOne({ where: { id: chamadoId } });
  }

  listarAberto(chamadoId: string): Promise<Chamado | null> {
    return this.chamadoRepo.findOne({
      where: { id: chamadoId, ultimoStatus: Not(StatusChamado.FINALIZADO) },
    });
  }

  listarTodos(): Promise<Chamado[]> {
    return this.chamadoRepo.find({ relations: ['mensagens'] });
  }

  listarApenasDepartamento(departamentoId: number): Promise<Chamado[]> {
    return this.chamadoRepo.find({
      where: { departamentoResponsavel: departamentoId },
      relations: ['mensagens'],
    });
  }

  remove(id: string): Promise<UpdateResult> {
    return this.chamadoRepo
      .createQueryBuilder()
      .update({ ativo: false })
      .where('id = :id', { id })
      .execute();
  }
}
