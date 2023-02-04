import { forwardRef, Module } from '@nestjs/common';
import { MensagensService } from './mensagens.service';
import { MensagensController } from './mensagens.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresBDService } from 'src/postgres.bd';
import { Mensagem } from './entities/mensagem.entity';
import { ChamadosModule } from 'src/chamados/chamados.module';
import { MensagensRepository } from './mensagens.repository';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MensagensEvents } from './events/mensagens.events';
import { HistoricoChamadoModule } from 'src/historico-chamado/historico-chamado.module';

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
    TypeOrmModule.forFeature([Mensagem]),
    forwardRef(() => ChamadosModule),
    EventEmitterModule.forRoot(),
    HistoricoChamadoModule,
  ],
  controllers: [MensagensController],
  providers: [MensagensService, MensagensRepository, MensagensEvents],
  exports: [MensagensRepository],
})
export class MensagensModule {}
