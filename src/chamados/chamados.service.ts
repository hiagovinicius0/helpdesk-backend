import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ChamadosRepository } from './chamados.repository';
import { tz } from 'moment-timezone';
import { CriarChamadoDto } from './dto/criar-chamado.dto';
import { PrioridadeChamado } from 'src/enum/PrioridadeChamado';
import { StatusChamado } from 'src/enum/StatusChamado';
import { DepartamentosRepository } from 'src/departamentos/departamentos.repository';
import { AtualizarChamadoDto } from './dto/atualizar-chamado.dto';
import { Chamado } from './entities/chamado.entity';
import { StatusResponse } from 'src/generics/constants';
import { TipoUsuario } from 'src/enum/TipoUsuario';

@Injectable()
export class ChamadosService {
  constructor(
    private chamadoRepository: ChamadosRepository,
    private readonly departamentosRepository: DepartamentosRepository,
  ) {}

  async criarChamado(
    { departamentoResponsavel, prioridade, titulo }: CriarChamadoDto,
    usuarioId: number,
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

    return this.chamadoRepository.salvar({
      departamentoResponsavel,
      dtaExpiracao: agora
        .add(dtaExpiracao, 'days')
        .format('YYYY-MM-DD HH:mm:ss'),
      dtaInsercao: dtaInsercao,
      prioridade,
      titulo,
      ultimoStatus: StatusChamado.NAO_ATENDIDO,
      usuarioCriador: usuarioId,
    });
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

  listarChamados(
    funcao: TipoUsuario,
    departamentoId: number,
  ): Promise<Chamado[]> {
    if (funcao === TipoUsuario.ADMIN) {
      return this.chamadoRepository.listarTodos();
    }

    return this.chamadoRepository.listarApenasDepartamento(departamentoId);
  }

  async findOne(id: number): Promise<Chamado> {
    const departamento = await this.chamadoRepository.listar(id);

    if (departamento === null) {
      throw new NotFoundException('Chamado não encontrado');
    }

    return departamento;
  }

  async atualizarChamado(
    chamadoId: number,
    atualizarChamadoDto: AtualizarChamadoDto,
  ): Promise<Chamado> {
    const chamado = await this.chamadoRepository.listar(chamadoId);

    if (chamado === null) {
      throw new NotFoundException('Chamado não encontrado!');
    }

    for (const key in atualizarChamadoDto) {
      chamado[key] = atualizarChamadoDto[key];
    }

    delete chamado.dtaExpiracao;
    delete chamado.dtaInsercao;
    await this.chamadoRepository.salvar(chamado);

    return this.chamadoRepository.listar(chamadoId);
  }

  async remover(id: number): Promise<StatusResponse> {
    await this.chamadoRepository.remove(id);

    return { status: 'OK' };
  }
}
