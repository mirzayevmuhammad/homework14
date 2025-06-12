import { BadRequestException, Injectable } from '@nestjs/common';
import RedisService from 'src/core/database/redis.service';
import { generate } from 'otp-generator';
import {} from 'module';
@Injectable()
class OtpService {
  constructor(private redisService: RedisService) {}
  generateOtp() {
    const otp = generate(4, {
      digits: true,
      specialChars: false,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
    });
    return otp;
  }
  async SendOtp(phone_number: string) {
    await this.checkOtpExisted(`user:${phone_number}`);
    const tempOtp = this.generateOtp();
    const responseRedis = await this.redisService.setOtp(phone_number, tempOtp);
    console.log(responseRedis);
    if (responseRedis === 'OK') return true;
  }
  async checkOtpExisted(key: string) {
    const checkOtp = await this.redisService.getOtp(key);
    if (checkOtp) {
      const ttl = await this.redisService.getTTLKey(key);
      throw new BadRequestException(`Please try again after ${ttl} seconds`);
    }
  }
  async verifyOtpSendUser(key: string, code: string) {
    const otp = await this.redisService.getOtp(key);
    if (!otp || otp !== code) throw new BadRequestException(`invalid code`);
    return true;
    await this.redisService.delKey(key);
  }
}

export default OtpService;
