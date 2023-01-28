import { Module } from '@nestjs/common';
import { DepartamentosService } from './departamentos.service';
import { DepartamentosController } from './departamentos.controller';
import { DepartamentosRepository } from './departamentos.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgresBDService } from 'src/generics/postgres.bd';
import { Departamento } from './entities/departamento.entity';

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
    TypeOrmModule.forFeature([Departamento]),
  ],
  controllers: [DepartamentosController],
  providers: [DepartamentosService, DepartamentosRepository],
  exports: [DepartamentosRepository],
})
export class DepartamentosModule {}
