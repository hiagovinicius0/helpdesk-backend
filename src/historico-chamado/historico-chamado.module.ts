import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresBDService } from 'src/postgres.bd';
import { HistoricoChamado } from './entities/historico-chamado.entity';
import { HistoricoChamadoRepository } from './historico-chamado.repository';

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
    TypeOrmModule.forFeature([HistoricoChamado]),
  ],
  providers: [HistoricoChamadoRepository],
  exports: [HistoricoChamadoRepository],
})
export class HistoricoChamadoModule {}
