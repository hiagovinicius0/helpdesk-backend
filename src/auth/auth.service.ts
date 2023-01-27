import { LoginDto } from 'src/dto/login.dto';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/dto/register.dto';
import { AuthRepository } from './auth.repository';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}
  async login(login: LoginDto) {
    const usuario = await this.authRepository.obterUsuario(login.email);
    if (!usuario) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    if (!usuario.ativo) {
      throw new UnauthorizedException('Usuário inativo');
    }
    if (!this.verificarSenha(login.senha, usuario.senha)) {
      throw new UnauthorizedException('Usuário e senha não confere');
    }

    const payload = { username: login.email, sub: usuario.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  criptografarSenha(senha: string) {
    return bcrypt.hashSync(senha, bcrypt.genSaltSync());
  }

  verificarSenha(senha: string, senhaCriptografada: string) {
    return bcrypt.compare(senha, senhaCriptografada);
  }

  async criarUsuario(criarUsuario: RegisterDto) {
    const usuario = await this.authRepository.obterUsuario(criarUsuario.email);
    if (usuario) {
      throw new BadRequestException('Usuario já existe');
    }
    const senhaCriptografada = this.criptografarSenha(criarUsuario.senha);
    return this.authRepository.criarUsuario({
      nome: criarUsuario.nome,
      senha: senhaCriptografada,
      departamento: criarUsuario.departamento,
      email: criarUsuario.email,
      funcao: criarUsuario.funcao,
    });
  }

  async validarUsuario(id: number, email: string): Promise<Usuario> {
    const usuario = await this.authRepository.obterUsuarioToken(id, email);
    if (usuario === null) {
      throw new UnauthorizedException('Usuário não encontrado!');
    }

    return usuario;
  }
}
