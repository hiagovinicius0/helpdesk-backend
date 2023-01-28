import { SetMetadata } from '@nestjs/common';
import { TipoUsuario } from './tipo-usuario';

export const TIPO_USUARIO_KEY = 'funcao';
export const TiposDeUsuario = (...tipoUsuario: TipoUsuario[]) =>
  SetMetadata(TIPO_USUARIO_KEY, tipoUsuario);
