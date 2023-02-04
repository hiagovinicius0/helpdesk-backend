import { Usuario } from 'src/auth/entities/usuario.entity';
import { Chamado } from 'src/chamados/entities/chamado.entity';
import { PrioridadeChamado } from 'src/enum/PrioridadeChamado';
import { StatusChamado } from 'src/enum/StatusChamado';
import { TipoHistorico } from 'src/enum/TipoHistorico';
import { ColumnDateTransformer } from 'src/generics/functions';
import { Mensagem } from 'src/mensagens/entities/mensagem.entity';
import { DateTypeDB } from 'src/types/constants';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HistoricoChamado {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(() => Mensagem, (mensagem) => mensagem.historicoChamados)
  mensagem?: Mensagem;

  @ManyToOne(() => Usuario, (usuario) => usuario.historicoChamados)
  usuario: Usuario;

  @Column({ nullable: true })
  status?: StatusChamado;

  @ManyToOne(() => Chamado, (chamado) => chamado.historicoChamados)
  chamado: Chamado;

  @Column({ nullable: true })
  prioridade?: PrioridadeChamado;

  @Column()
  tipoHistorico: TipoHistorico;

  @Column({ type: 'timestamp', transformer: new ColumnDateTransformer() })
  createdAt: DateTypeDB;
}
