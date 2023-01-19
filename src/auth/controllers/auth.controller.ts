import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller()
export class AuthController {

  constructor(private authService: AuthService) { }

  @Post('login')
  async login(@Body() body: { email: string, password: string }) {
    const { email, password } = body;
    if (email && password) return this.authService.login(email, password);
    else throw new BadRequestException('E-mail e senha são obrigatórios.');
  }

  @Post('register')
  async register(@Body() body: { email: string, password: string }) {
    const { email, password } = body;
    if (email && password) return this.authService.register(email, password);
    else throw new BadRequestException('E-mail e senha são obrigatórios.');
  }

}