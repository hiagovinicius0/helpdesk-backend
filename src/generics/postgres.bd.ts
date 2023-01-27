import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class PostgresBDService {
  constructor(private configService: ConfigService) {}

  public getConnectionPotgres(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      username: this.configService.get('BD_USERNAME'),
      password: this.configService.get('BD_PASSWORD'),
      database: this.configService.get('BD_DATABASE'),
      port: this.configService.get('BD_PORT'),
      host: this.configService.get('BD_HOST'),
      synchronize: false,
      retryAttempts: 10,
      retryDelay: 3000,
      autoLoadEntities: true,
    };
  }
}
