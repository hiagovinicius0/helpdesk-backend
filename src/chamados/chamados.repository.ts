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
    return this.chamadoRepo.findOne({
      where: { id: chamadoId },
      relations: [
        'departamentoResponsavel',
        'usuarioCriador',
        'mensagens',
        'mensagens.usuario',
        'mensagens.usuario.departamento',
      ],
    });
  }

  listarAberto(chamadoId: string): Promise<Chamado | null> {
    return this.chamadoRepo.findOne({
      where: { id: chamadoId, ultimoStatus: Not(StatusChamado.FINALIZADO) },
      relations: [
        'departamentoResponsavel',
        'usuarioCriador',
        'mensagens',
        'mensagens.usuario',
        'mensagens.usuario.departamento',
      ],
    });
  }

  listarTodos(): Promise<Chamado[]> {
    return this.chamadoRepo.find({
      relations: ['departamentoResponsavel', 'usuarioCriador'],
    });
  }

  listarNumeroAleatorio(ordem: number): Promise<Chamado> {
    return this.chamadoRepo.findOne({ where: { ordem } });
  }

  listarApenasDepartamento(
    departamentoId: number,
    usuarioId: number,
  ): Promise<Chamado[]> {
    return this.chamadoRepo.find({
      where: [
        { departamentoResponsavel: { id: departamentoId } },
        { usuarioCriador: { id: usuarioId } },
      ],
      relations: ['departamentoResponsavel', 'usuarioCriador'],
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
