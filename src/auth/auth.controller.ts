import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { LoginDto } from 'src/dto/login.dto';
import { RegisterDto } from 'src/dto/register.dto';
import { AuthService } from './auth.service';
import { Public } from '../decorator/public';
import { ApiResponse } from '@nestjs/swagger';
import { LoginResponseDto } from 'src/dto/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  @Public()
  @ApiResponse({
    status: 201,
    type: LoginResponseDto,
  })
  login(@Body() login: LoginDto) {
    return this.authService.login(login);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/register')
  @Public()
  register(@Body() register: RegisterDto) {
    return this.authService.criarUsuario(register);
  }
}
