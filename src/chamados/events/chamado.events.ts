import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { tz } from 'moment-timezone';
import { TipoHistorico } from 'src/enum/TipoHistorico';
import { HistoricoChamadoRepository } from 'src/historico-chamado/historico-chamado.repository';
import { AtualizarPrioridadeEvent } from './atualizar-prioridade.event';
import { AtualizarStatusEvent } from './atualizar-status.event';

@Injectable()
export class ChamadoEvents {
  constructor(
    private readonly historicoChamadoRepository: HistoricoChamadoRepository,
  ) {}
  @OnEvent('atualizar.prioridade')
  async handlePrioridadeAtualizada({
    chamado,
    usuarioEditor,
  }: AtualizarPrioridadeEvent): Promise<void> {
    const agora = tz('America/Sao_Paulo');

    await this.historicoChamadoRepository.salvar({
      chamado,
      createdAt: agora.format('YYYY-MM-DD HH:mm:ss'),
      tipoHistorico: TipoHistorico.PRIORIDADE_CHAMADO,
      usuario: usuarioEditor,
      prioridade: chamado.prioridade,
    });
  }

  @OnEvent('atualizar.status')
  async handleStatusAtualizado({
    chamado,
    usuarioEditor,
  }: AtualizarStatusEvent): Promise<void> {
    const agora = tz('America/Sao_Paulo');

    await this.historicoChamadoRepository.salvar({
      chamado,
      createdAt: agora.format('YYYY-MM-DD HH:mm:ss'),
      tipoHistorico: TipoHistorico.STATUS_CHAMADO,
      usuario: usuarioEditor,
      status: chamado.ultimoStatus,
    });
  }
}
