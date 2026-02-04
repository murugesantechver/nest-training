// src/auth/auth.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/features/users/dto/create-user.dto';
import {  ApiTags } from '@nestjs/swagger';
import { LoginDto } from './login.dto';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @Public()
  login(@Body() body: LoginDto) {
    console.log('body ::::::::::::;;;', body);
    return this.authService.login(body.email, body.password);
  }
}
