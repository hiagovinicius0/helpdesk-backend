import { Usuario } from 'src/auth/entities/usuario.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Departamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  ativo: boolean;

  @OneToMany(() => Usuario, (usuario) => usuario.departamento)
  usuarios: Usuario[];
}
