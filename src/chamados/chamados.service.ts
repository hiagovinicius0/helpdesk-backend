import { BadRequestException, Injectable } from '@nestjs/common';
import { ChamadosRepository } from './chamados.repository';
import { tz } from 'moment-timezone';
import { CriarChamadoDto } from './dto/criar-chamado.dto';
import { PrioridadeChamado } from 'src/enum/PrioridadeChamado';
import { StatusChamado } from 'src/enum/StatusChamado';
import { DepartamentosRepository } from 'src/departamentos/departamentos.repository';

@Injectable()
export class ChamadosService {
  constructor(
    private chamadoRepository: ChamadosRepository,
    private readonly departamentosRepository: DepartamentosRepository,
  ) {}
  async criarChamado(
    { departamento, prioridade, titulo }: CriarChamadoDto,
    usuarioId: number,
  ) {
    const agora = tz('America/Sao_Paulo');
    const dtaExpiracao = this.obterExpiracao(prioridade);
    const departamentoBd =
      await this.departamentosRepository.listarDepartamentoAtivo(departamento);

    if (departamentoBd === null) {
      throw new BadRequestException('Departamento não Encontrado');
    }

    const dtaInsercao = agora.format('YYYY-MM-DD HH:mm:ss');

    return this.chamadoRepository.criar({
      departamentoResponsavel: departamento,
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
}
