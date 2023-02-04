import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DepartamentosModule } from './departamentos/departamentos.module';
import { GuardModule } from './guard/guard.module';
import { ChamadosModule } from './chamados/chamados.module';
import { MensagensModule } from './mensagens/mensagens.module';
import { HistoricoChamadoModule } from './historico-chamado/historico-chamado.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    DepartamentosModule,
    GuardModule,
    ChamadosModule,
    MensagensModule,
    HistoricoChamadoModule,
  ],
})
export class AppModule {}
