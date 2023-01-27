import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DepartamentosModule } from './departamentos/departamentos.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, DepartamentosModule],
})
export class AppModule {}
