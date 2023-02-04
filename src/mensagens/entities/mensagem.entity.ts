import { Usuario } from 'src/auth/entities/usuario.entity';
import { Chamado } from 'src/chamados/entities/chamado.entity';
import { ColumnDateTransformer } from 'src/generics/functions';
import { HistoricoChamado } from 'src/historico-chamado/entities/historico-chamado.entity';
import { DateTypeDB } from 'src/types/constants';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Mensagem {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'text' })
  descricao: string;

  @Column({ type: 'timestamp', transformer: new ColumnDateTransformer() })
  horario: DateTypeDB;

  @ManyToOne(() => Usuario, (usuario) => usuario.mensagens)
  usuario: Usuario;

  @ManyToOne(() => Chamado, (chamado) => chamado.mensagens)
  chamado: Chamado;

  @OneToMany(
    () => HistoricoChamado,
    (historicoChamado) => historicoChamado.mensagem,
  )
  historicoChamados: HistoricoChamado[];
}
