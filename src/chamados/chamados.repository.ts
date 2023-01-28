import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICriarChamado } from './constants';
import { Chamado } from './entities/chamado.entity';

@Injectable()
export class ChamadosRepository {
  constructor(
    @InjectRepository(Chamado)
    private readonly chamadoRepo: Repository<Chamado>,
  ) {}

  criar(criarChamadoDto: ICriarChamado) {
    return this.chamadoRepo.save(criarChamadoDto);
  }
}
