import { ColumnDateTransformer } from 'src/generics/functions';
import { DateTypeDB } from 'src/types/constants';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('chamados')
export class Chamado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({
    type: 'timestamp',
    transformer: new ColumnDateTransformer(),
  })
  dtaInsercao: DateTypeDB;

  @Column()
  usuarioCriador: number;

  @Column({
    type: 'timestamp',
    transformer: new ColumnDateTransformer(),
  })
  dtaExpiracao: DateTypeDB;

  @Column()
  departamentoResponsavel: number;

  @Column()
  prioridade: number;

  @Column()
  ultimoStatus: number;
}
