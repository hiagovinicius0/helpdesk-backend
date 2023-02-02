import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  criarUsuario(usuario: Usuario): Promise<Usuario> {
    return this.usuarioRepo.save(usuario);
  }

  obterUsuario(email: string): Promise<Usuario | null> {
    return this.usuarioRepo.findOne({ where: { email: email } });
  }

  obterUsuarioToken(id: number, email: string): Promise<Usuario | null> {
    return this.usuarioRepo.findOne({ where: { id, email } });
  }
}
