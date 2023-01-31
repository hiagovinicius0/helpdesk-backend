import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isNumber, JwtPayload } from './constants';
import { AuthService } from './auth.service';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('AUTH_SECRET'),
    });
  }

  async validate({ sub, username }: JwtPayload): Promise<Usuario> {
    if (!sub || !username) {
      throw new UnauthorizedException('Token Incorreto');
    }

    if (!isNumber(sub)) {
      throw new UnauthorizedException('Token Incorreto');
    }

    return this.authService.validarUsuario(sub, username);
  }
}
