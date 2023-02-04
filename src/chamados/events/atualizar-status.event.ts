import { Usuario } from 'src/auth/entities/usuario.entity';
import { Chamado } from '../entities/chamado.entity';

export class AtualizarStatusEvent {
  constructor(public chamado: Chamado, public usuarioEditor: Usuario) {}
}
