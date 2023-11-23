import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
  providers: [
    UserResolver,
    UserService,
    ConfigService,
    JwtService,
    JwtStrategy,
  ],
})
export class UserModule {}
