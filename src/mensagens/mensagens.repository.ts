import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensagem } from './entities/mensagem.entity';
import { NovaMensagemEvent } from './events/nova-mensagem.event';

@Injectable()
export class MensagensRepository {
  constructor(
    @InjectRepository(Mensagem)
    private readonly mensagemRepo: Repository<Mensagem>,
    private eventEmitter: EventEmitter2,
  ) {}

  async salvar(mensagem: Mensagem): Promise<Mensagem> {
    const novaMensagem = await this.mensagemRepo.save(mensagem);
    this.eventEmitter.emit(
      'nova.mensagem',
      new NovaMensagemEvent(novaMensagem),
    );

    return novaMensagem;
  }

  getMensagensChamado(chamadoId: string): Promise<Mensagem[]> {
    return this.mensagemRepo.find({
      where: { chamado: { id: chamadoId } },
      order: { horario: 'ASC' },
      relations: ['usuario', 'usuario.departamento'],
    });
  }

  getMensagem(mensagemId: string): Promise<Mensagem> {
    return this.mensagemRepo.findOne({
      where: { id: mensagemId },
      order: { horario: 'ASC' },
      relations: ['usuario', 'usuario.departamento'],
    });
  }
}
