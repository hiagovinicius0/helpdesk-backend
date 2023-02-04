import { Usuario } from 'src/auth/entities/usuario.entity';
import { Departamento } from 'src/departamentos/entities/departamento.entity';
import { ColumnDateTransformer } from 'src/generics/functions';
import { HistoricoChamado } from 'src/historico-chamado/entities/historico-chamado.entity';
import { Mensagem } from 'src/mensagens/entities/mensagem.entity';
import { DateTypeDB } from 'src/types/constants';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Chamado {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column()
  ordem: number;

  @Column({
    type: 'timestamp',
    transformer: new ColumnDateTransformer(),
  })
  dtaInsercao: DateTypeDB;

  @Column({
    type: 'timestamp',
    transformer: new ColumnDateTransformer(),
  })
  dtaExpiracao: DateTypeDB;

  @Column()
  prioridade: number;

  @Column()
  ultimoStatus: number;

  @Column({ type: 'boolean' })
  ativo: boolean;

  @ManyToOne(() => Usuario, (usuario) => usuario.chamados)
  usuarioCriador: Usuario;

  @ManyToOne(() => Departamento, (departamento) => departamento.chamados)
  departamentoResponsavel: Departamento;

  @OneToMany(() => Mensagem, (mensagem) => mensagem.chamado)
  mensagens: Mensagem[];

  @OneToMany(
    () => HistoricoChamado,
    (historicoChamado) => historicoChamado.chamado,
  )
  historicoChamados: HistoricoChamado[];
}
