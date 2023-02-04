import { ApiProperty } from '@nestjs/swagger';
import { CreateDepartamentoResponseDto } from 'src/departamentos/dto/response/create-departamentos-response.dto';
import { TipoUsuario } from 'src/enum/TipoUsuario';

export class UsuarioResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  funcao: TipoUsuario;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  departamento: CreateDepartamentoResponseDto;
}

export class LoginResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  usuario: UsuarioResponseDto;
}
