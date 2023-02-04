import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../decorator/public';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Usuario } from './entities/usuario.entity';
import { LoginDto } from './dto/request/login.dto';
import { RegisterDto } from './dto/request/register.dto';
import { LoginResponseDto } from './dto/response/login-response.dto';
import { RegisterResponseDto } from './dto/response/register-response.dto';

@Controller('auth')
@ApiTags('Auth')
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
  @ApiResponse({
    status: 201,
    type: RegisterResponseDto,
  })
  register(@Body() register: RegisterDto): Promise<Usuario> {
    return this.authService.criarUsuario(register);
  }
}
