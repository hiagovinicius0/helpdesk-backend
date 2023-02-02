import { Injectable, NotFoundException } from '@nestjs/common';
import { tz } from 'moment-timezone';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { ChamadosRepository } from 'src/chamados/chamados.repository';
import { CreateMensagemDto } from './dto/create-mensagem.dto';
import { GetMensagensChamadoDto } from './dto/get-mensagens-chamado.dto';
import { Mensagem } from './entities/mensagem.entity';
import { MensagensRepository } from './mensagens.repository';

@Injectable()
export class MensagensService {
  constructor(
    private readonly chamadosRepository: ChamadosRepository,
    private readonly mensagensRepository: MensagensRepository,
  ) {}

  async create(
    createMensagemDto: CreateMensagemDto,
    usuario: Usuario,
  ): Promise<Mensagem> {
    const chamado = await this.chamadosRepository.listarAberto(
      createMensagemDto.chamadoId,
    );

    if (chamado === null) {
      throw new NotFoundException('Chamado não encontrado!');
    }

    const agora = tz('America/Sao_Paulo');
    const horario = agora.format('YYYY-MM-DD HH:mm:ss');

    const mensagem = await this.mensagensRepository.salvar({
      chamado,
      descricao: createMensagemDto.descricao,
      horario,
      usuario,
    });

    delete mensagem.usuario;
    delete mensagem.chamado;

    return mensagem;
  }

  mensagensChamado(
    getMensagensChamadoDto: GetMensagensChamadoDto,
  ): Promise<Mensagem[]> {
    return this.mensagensRepository.getMensagensChamado(
      getMensagensChamadoDto.chamadoId,
    );
  }

  findOne(id: string): Promise<Mensagem> {
    return this.mensagensRepository.getMensagem(id);
  }
}
