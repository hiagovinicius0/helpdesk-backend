import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { tz } from 'moment-timezone';
import { TipoHistorico } from 'src/enum/TipoHistorico';
import { HistoricoChamadoRepository } from 'src/historico-chamado/historico-chamado.repository';
import { NovaMensagemEvent } from './nova-mensagem.event';

@Injectable()
export class MensagensEvents {
  constructor(
    private readonly historicoChamadoRepository: HistoricoChamadoRepository,
  ) {}
  @OnEvent('nova.mensagem')
  async handleNovaMensagemCriada({
    mensagem,
  }: NovaMensagemEvent): Promise<void> {
    const agora = tz('America/Sao_Paulo');

    await this.historicoChamadoRepository.salvar({
      chamado: mensagem.chamado,
      createdAt: agora.format('YYYY-MM-DD HH:mm:ss'),
      tipoHistorico: TipoHistorico.MENSAGEM_CHAMADO,
      usuario: mensagem.usuario,
      mensagem,
    });
  }
}
