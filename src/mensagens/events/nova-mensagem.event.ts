import { Mensagem } from '../entities/mensagem.entity';

export class NovaMensagemEvent {
  constructor(public mensagem: Mensagem) {}
}
