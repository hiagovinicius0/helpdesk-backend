import { Exclude } from 'class-transformer';
import { Departamento } from 'src/departamentos/entities/departamento.entity';
import { TipoUsuario } from 'src/enum/TipoUsuario';
import { ColumnNumericTransformer } from 'src/generics/functions';
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
}
