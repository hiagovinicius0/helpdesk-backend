import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ChamadosRepository } from './chamados.repository';
import { tz } from 'moment-timezone';
import { PrioridadeChamado } from 'src/enum/PrioridadeChamado';
import { StatusChamado } from 'src/enum/StatusChamado';
import { DepartamentosRepository } from 'src/departamentos/departamentos.repository';
import { Chamado } from './entities/chamado.entity';
import { StatusResponse } from 'src/generics/constants';
import { TipoUsuario } from 'src/enum/TipoUsuario';
import { MensagensRepository } from 'src/mensagens/mensagens.repository';
import { Usuario } from 'src/auth/entities/usuario.entity';
import * as crypto from 'crypto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AtualizarStatusEvent } from './events/atualizar-status.event';
import { AtualizarPrioridadeEvent } from './events/atualizar-prioridade.event';
import { HistoricoChamadoRepository } from 'src/historico-chamado/historico-chamado.repository';
import { HistoricoChamado } from 'src/historico-chamado/entities/historico-chamado.entity';
import { CriarChamadoDto } from './dto/request/criar-chamado.dto';
import { AtualizarChamadoDto } from './dto/request/atualizar-chamado.dto';

@Injectable()
export class ChamadosService {
  constructor(
    private chamadoRepository: ChamadosRepository,
    private readonly departamentosRepository: DepartamentosRepository,
    private readonly mensagensRepository: MensagensRepository,
    private readonly eventEmitter: EventEmitter2,
    private readonly historicoChamadoRepository: HistoricoChamadoRepository,
  ) {}

  async criarChamado(
    { departamentoResponsavel, prioridade, titulo, descricao }: CriarChamadoDto,
    usuario: Usuario,
  ): Promise<Chamado> {
    const agora = tz('America/Sao_Paulo');
    const dtaExpiracao = this.obterExpiracao(prioridade);
    const departamentoBd =
      await this.departamentosRepository.listarDepartamentoAtivo(
        departamentoResponsavel,
      );

    if (departamentoBd === null) {
      throw new BadRequestException('Departamento não Encontrado');
    }

    const dtaInsercao = agora.format('YYYY-MM-DD HH:mm:ss');
    const ordem = await this.getNumeroAleatorio();

    const chamado = await this.chamadoRepository.salvar({
      departamentoResponsavel: departamentoBd,
      dtaExpiracao: agora
        .add(dtaExpiracao, 'days')
        .format('YYYY-MM-DD HH:mm:ss'),
      dtaInsercao: dtaInsercao,
      prioridade,
      titulo,
      ultimoStatus: StatusChamado.NAO_ATENDIDO,
      usuarioCriador: usuario,
      ativo: true,
      ordem,
    });

    await this.mensagensRepository.salvar({
      chamado,
      descricao,
      horario: dtaInsercao,
      usuario,
      historicoChamados: [],
    });
    delete chamado.usuarioCriador;

    return chamado;
  }

  obterExpiracao(prioridade: PrioridadeChamado): number {
    switch (prioridade) {
      case PrioridadeChamado.ALTO:
        return 1;
      case PrioridadeChamado.MEDIO:
        return 2;
      case PrioridadeChamado.BAIXO:
        return 3;
      default:
        throw new BadRequestException('Prioridade não Encontrada');
    }
  }

  listarChamados(usuario: Usuario): Promise<Chamado[]> {
    if (usuario.funcao === TipoUsuario.ADMIN) {
      return this.chamadoRepository.listarTodos();
    }

    return this.chamadoRepository.listarApenasDepartamento(
      usuario.departamento.id,
      usuario.id,
    );
  }

  async findOne(id: string): Promise<Chamado> {
    const departamento = await this.chamadoRepository.listar(id);

    if (departamento === null) {
      throw new NotFoundException('Chamado não encontrado');
    }

    return departamento;
  }

  async findHistorico(chamadoId: string): Promise<HistoricoChamado[]> {
    const historico = await this.historicoChamadoRepository.listar(chamadoId);

    if (!historico) {
      throw new NotFoundException('Histórico não Encontrado!');
    }

    return historico;
  }

  async atualizarChamado(
    chamadoId: string,
    atualizarChamadoDto: AtualizarChamadoDto,
    usuario: Usuario,
  ): Promise<Chamado> {
    const chamado = await this.chamadoRepository.listar(chamadoId);

    if (chamado === null) {
      throw new NotFoundException('Chamado não encontrado!');
    }

    for (const key in atualizarChamadoDto) {
      chamado[key] = atualizarChamadoDto[key];
    }

    const [statusModificado, prioridadeModificada] =
      this.verificarEventos(atualizarChamadoDto);

    delete chamado.dtaExpiracao;
    delete chamado.dtaInsercao;
    await this.chamadoRepository.salvar(chamado);

    this.chamarEventos(
      statusModificado,
      prioridadeModificada,
      chamado,
      usuario,
    );

    return this.chamadoRepository.listar(chamadoId);
  }

  async remover(id: string): Promise<StatusResponse> {
    await this.chamadoRepository.remove(id);

    return { status: 'OK' };
  }

  async getNumeroAleatorio(): Promise<number> {
    const randomNumer = crypto.randomInt(100000, 99999999);
    const listarRandomNumber =
      await this.chamadoRepository.listarNumeroAleatorio(randomNumer);

    if (listarRandomNumber) {
      return crypto.randomInt(100000, 99999999);
    }

    return randomNumer;
  }

  chamarEventos(
    statusModificado: boolean,
    prioridadeModificada: boolean,
    chamado: Chamado,
    usuario: Usuario,
  ): void {
    if (statusModificado) {
      this.eventEmitter.emit(
        'atualizar.status',
        new AtualizarStatusEvent(chamado, usuario),
      );
    }

    if (prioridadeModificada) {
      this.eventEmitter.emit(
        'atualizar.prioridade',
        new AtualizarPrioridadeEvent(chamado, usuario),
      );
    }
  }

  verificarEventos(
    atualizarChamadoDto: AtualizarChamadoDto,
  ): [boolean, boolean] {
    let statusModificado = false,
      prioridadeModificada = false;

    for (const key in atualizarChamadoDto) {
      if (key === 'ultimoStatus') {
        statusModificado = true;
      }

      if (key === 'prioridade') {
        prioridadeModificada = true;
      }
    }

    return [statusModificado, prioridadeModificada];
  }
}
