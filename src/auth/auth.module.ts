import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtStrategy } from './jwt-stategy';
import { JwtAuthGuard } from './jwt-aut.guard';
import { PostgresBDService } from 'src/generics/postgres.bd';
import { DepartamentosModule } from 'src/departamentos/departamentos.module';

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
    TypeOrmModule.forFeature([Usuario]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('AUTH_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    DepartamentosModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
