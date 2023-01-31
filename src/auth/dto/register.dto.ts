import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TipoUsuario } from 'src/enum/TipoUsuario';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  senha: string;

  @IsNotEmpty()
  @IsEnum(TipoUsuario)
  funcao: TipoUsuario;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  departamento: number;
}
