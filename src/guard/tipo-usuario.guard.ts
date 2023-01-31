import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { TipoUsuario } from 'src/enum/TipoUsuario';

export const TIPO_USUARIO_KEY = 'funcao';
export const TiposDeUsuario = (
  ...tipoUsuario: TipoUsuario[]
): CustomDecorator<string> => SetMetadata(TIPO_USUARIO_KEY, tipoUsuario);
