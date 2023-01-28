import { Exclude } from 'class-transformer';
import { TipoUsuario } from 'src/enum/TipoUsuario';
import { ColumnNumericTransformer } from 'src/generics/functions';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  senha: string;

  @Column({
    type: 'numeric',
    precision: 2,
    scale: 0,
    transformer: new ColumnNumericTransformer(),
  })
  funcao: TipoUsuario;

  @Column()
  departamento: number;

  @Column({ default: true })
  ativo: boolean;
}
