import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentosModule } from 'src/departamentos/departamentos.module';
import { PostgresBDService } from 'src/generics/postgres.bd';
import { ChamadosController } from './chamados.controller';
import { ChamadosRepository } from './chamados.repository';
import { ChamadosService } from './chamados.service';
import { Chamado } from './entities/chamado.entity';

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
  ],
  providers: [ChamadosService, ChamadosRepository],
  controllers: [ChamadosController],
})
export class ChamadosModule {}
