import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { AuthService } from './auth.service';
import { Public } from '../decorator/public';
import { ApiResponse } from '@nestjs/swagger';
import { LoginResponseDto } from 'src/auth/dto/login-response.dto';
import { Usuario } from './entities/usuario.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @Public()
  @ApiResponse({
    status: 201,
    type: LoginResponseDto,
  })
  login(@Body() login: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(login);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  @Public()
  register(@Body() register: RegisterDto): Promise<Usuario> {
    return this.authService.criarUsuario(register);
  }
}
