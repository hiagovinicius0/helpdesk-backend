import { Exclude } from 'class-transformer';
import { Chamado } from 'src/chamados/entities/chamado.entity';
import { Departamento } from 'src/departamentos/entities/departamento.entity';
import { TipoUsuario } from 'src/enum/TipoUsuario';
import { ColumnNumericTransformer } from 'src/generics/functions';
import { HistoricoChamado } from 'src/historico-chamado/entities/historico-chamado.entity';
import { Mensagem } from 'src/mensagens/entities/mensagem.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  senha: string;

  @Exclude()
  @Column({
    type: 'numeric',
    precision: 2,
    scale: 0,
    transformer: new ColumnNumericTransformer(),
  })
  funcao: TipoUsuario;

  @Column({ default: true })
  ativo: boolean;

  @OneToMany(() => Mensagem, (mensagem) => mensagem.chamado)
  mensagens?: Mensagem[];

  @ManyToOne(() => Departamento, (departamento) => departamento.usuarios)
  departamento: Departamento;

  @OneToMany(
    () => HistoricoChamado,
    (historicoChamado) => historicoChamado.usuario,
  )
  historicoChamados?: HistoricoChamado[];

  @OneToMany(() => Chamado, (chamado) => chamado.usuarioCriador)
  chamados: Chamado[];
}
