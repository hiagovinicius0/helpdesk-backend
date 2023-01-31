import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  criarUsuario({
    departamento,
    email,
    funcao,
    nome,
    senha,
  }: RegisterDto): Promise<Usuario> {
    return this.usuarioRepo.save({
      ativo: true,
      nome: nome,
      senha: senha,
      tipoUsuario: funcao,
      departamento: departamento,
      funcao: funcao,
      email: email,
    });
  }

  obterUsuario(email: string): Promise<Usuario | null> {
    return this.usuarioRepo.findOne({ where: { email: email } });
  }

  obterUsuarioToken(id: number, email: string): Promise<Usuario | null> {
    return this.usuarioRepo.findOne({ where: { id, email } });
  }
}
