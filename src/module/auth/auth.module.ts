import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import OtpService from './otp.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService,OtpService],
})
export class AuthModule {}
