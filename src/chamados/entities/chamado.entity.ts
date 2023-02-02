import { ColumnDateTransformer } from 'src/generics/functions';
import { Mensagem } from 'src/mensagens/entities/mensagem.entity';
import { DateTypeDB } from 'src/types/constants';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Chamado {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column({ type: 'boolean' })
  ativo: boolean;

  @OneToMany(() => Mensagem, (mensagem) => mensagem.chamado)
  mensagens: Mensagem[];
}
