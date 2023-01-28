export interface ICriarChamado {
  titulo: string;
  dtaInsercao: string;
  usuarioCriador: number;
  dtaExpiracao: string;
  departamentoResponsavel: number;
  prioridade: number;
  ultimoStatus: number;
}
