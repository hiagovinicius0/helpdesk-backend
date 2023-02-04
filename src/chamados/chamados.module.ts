import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentosModule } from 'src/departamentos/departamentos.module';
import { HistoricoChamadoModule } from 'src/historico-chamado/historico-chamado.module';
import { MensagensModule } from 'src/mensagens/mensagens.module';
import { PostgresBDService } from 'src/postgres.bd';
import { ChamadosController } from './chamados.controller';
import { ChamadosRepository } from './chamados.repository';
import { ChamadosService } from './chamados.service';
import { Chamado } from './entities/chamado.entity';
import { ChamadoEvents } from './events/chamado.events';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return new PostgresBDService(config).getConnectionPotgres();
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Chamado]),
    DepartamentosModule,
    MensagensModule,
    HistoricoChamadoModule,
  ],
  providers: [ChamadosService, ChamadosRepository, ChamadoEvents],
  controllers: [ChamadosController],
  exports: [ChamadosRepository],
})
export class ChamadosModule {}
