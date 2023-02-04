import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoricoChamado } from './entities/historico-chamado.entity';

@Injectable()
export class HistoricoChamadoRepository {
  constructor(
    @InjectRepository(HistoricoChamado)
    private readonly historicoChamadoRepository: Repository<HistoricoChamado>,
  ) {}

  salvar(historicoChamado: HistoricoChamado): Promise<HistoricoChamado> {
    return this.historicoChamadoRepository.save(historicoChamado);
  }

  listar(chamadoId: string): Promise<HistoricoChamado[]> {
    return this.historicoChamadoRepository.find({
      where: { chamado: { id: chamadoId } },
      relations: [
        'mensagem',
        'usuario',
        'chamado',
        'usuario.departamento',
        'mensagem.usuario.departamento',
      ],
      order: { createdAt: 'ASC' },
    });
  }
}
