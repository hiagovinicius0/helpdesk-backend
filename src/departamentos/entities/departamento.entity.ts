import { Usuario } from 'src/auth/entities/usuario.entity';
import { Chamado } from 'src/chamados/entities/chamado.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Departamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ default: null })
  icone?: string;

  @Column()
  ativo: boolean;

  @OneToMany(() => Usuario, (usuario) => usuario.departamento)
  usuarios: Usuario[];

  @OneToMany(() => Chamado, (chamado) => chamado.departamentoResponsavel)
  chamados: Chamado[];
}
