import { Module } from '@nestjs/common';
import { MensagensService } from './mensagens.service';
import { MensagensController } from './mensagens.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresBDService } from 'src/postgres.bd';
import { Mensagem } from './entities/mensagem.entity';
import { ChamadosModule } from 'src/chamados/chamados.module';
import { MensagensRepository } from './mensagens.repository';

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
    ChamadosModule,
  ],
  controllers: [MensagensController],
  providers: [MensagensService, MensagensRepository],
})
export class MensagensModule {}
