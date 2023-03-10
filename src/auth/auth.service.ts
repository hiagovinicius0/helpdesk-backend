import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from './entities/usuario.entity';
import { DepartamentosRepository } from 'src/departamentos/departamentos.repository';
import { LoginResponseDto } from './dto/response/login-response.dto';
import { LoginDto } from './dto/request/login.dto';
import { RegisterDto } from './dto/request/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private jwtService: JwtService,
    private readonly departamentoRepository: DepartamentosRepository,
  ) {}
  async login(login: LoginDto): Promise<LoginResponseDto> {
    const usuario = await this.authRepository.obterUsuario(login.email);

    if (!usuario) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    if (!usuario.ativo) {
      throw new UnauthorizedException('Usuário inativo');
    }

    if (!(await this.verificarSenha(login.senha, usuario.senha))) {
      throw new UnauthorizedException('Usuário e senha não confere');
    }

    const payload = { username: login.email, sub: usuario.id };

    return {
      accessToken: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        funcao: usuario.funcao,
        nome: usuario.nome,
        departamento: usuario.departamento,
      },
    };
  }

  criptografarSenha(senha: string): string {
    return bcrypt.hashSync(senha, bcrypt.genSaltSync());
  }

  verificarSenha(senha: string, senhaCriptografada: string): Promise<boolean> {
    return bcrypt.compare(senha, senhaCriptografada);
  }

  async criarUsuario(criarUsuario: RegisterDto): Promise<Usuario> {
    const usuario = await this.authRepository.obterUsuario(criarUsuario.email);

    if (usuario) {
      throw new BadRequestException('Usuario já existe');
    }

    const departamento =
      await this.departamentoRepository.listarDepartamentoAtivo(
        criarUsuario.departamento,
      );

    if (departamento === null) {
      throw new BadRequestException('Departamento não encontrado!');
    }

    const senhaCriptografada = this.criptografarSenha(criarUsuario.senha);

    await this.authRepository.criarUsuario({
      nome: criarUsuario.nome,
      senha: senhaCriptografada,
      departamento,
      email: criarUsuario.email,
      funcao: criarUsuario.funcao,
      ativo: true,
      chamados: [],
    });

    return this.authRepository.obterUsuario(criarUsuario.email);
  }

  async validarUsuario(id: number, email: string): Promise<Usuario> {
    const usuario = await this.authRepository.obterUsuarioToken(id, email);

    if (usuario === null) {
      throw new UnauthorizedException('Usuário não encontrado!');
    }

    return usuario;
  }
}
