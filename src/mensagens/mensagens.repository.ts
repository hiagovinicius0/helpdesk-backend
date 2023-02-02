import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensagem } from './entities/mensagem.entity';

@Injectable()
export class MensagensRepository {
  constructor(
    @InjectRepository(Mensagem)
    private readonly mensagemRepo: Repository<Mensagem>,
  ) {}

  salvar(mensagem: Mensagem): Promise<Mensagem> {
    return this.mensagemRepo.save(mensagem);
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
