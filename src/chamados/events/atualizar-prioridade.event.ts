import { Usuario } from 'src/auth/entities/usuario.entity';
import { Chamado } from '../entities/chamado.entity';

export class AtualizarPrioridadeEvent {
  constructor(public chamado: Chamado, public usuarioEditor: Usuario) {}
}
