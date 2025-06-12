import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import PrismaService from 'src/core/database/prisma.service';
import bcrypt from 'bcrypt';
import OtpService from './otp.service';
import verifyOtpDto from './dto/verify.otp.dto';
@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtservice: JwtService,
    private prismaService: PrismaService,
    private otpService: OtpService,
  ) {}
  async sendOtpUser(createAuthDto: CreateAuthDto) {
    const findUser = await this.prismaService.prisma.user.findFirst({
      where: {
        phone_number: createAuthDto.phone_number,
      },
    });
    if (findUser) throw new ConflictException('phone number alredy exists');
    const phoneNumber = createAuthDto.phone_number;
    const res = await this.otpService.SendOtp(phoneNumber);
    if (!res) throw new InternalServerErrorException('server error');
    return {
      message: 'code sended',
    };
  }
  async verifyOtp(data: verifyOtpDto) {
    const key = `user:${data.phone_number}`;
    await this.otpService.verifyOtpSendUser(key, data.code);
    return {
      message: 'success',
      code: 200,
    };
  }

  async register() {}

  async login() {}
}
