import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('send-otp')
  async sendOtpUser(@Body() createAuthDto: CreateAuthDto) {
    const response = await this.authService.sendOtpUser(createAuthDto);
    return response;
  }

  @Post('verify-otp')
  async verifyOtp(@Body() data: { phone_number: string; code: string }) {
    return await this.authService.verifyOtp(data);
  }

  @Post('send-register')
  async register(@Body() createAuthDto: CreateAuthDto) {
    const response = await this.authService.register();
    return response;
  }

  @Post('login')
  async login() {}
}

/*
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/mirzayevmuhammad/homework13.git
git push -u origin main
*/
