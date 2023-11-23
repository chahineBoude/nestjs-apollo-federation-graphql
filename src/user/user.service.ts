import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async logIn(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) throw new ForbiddenException('Invalid Credentials');
    const pwdCompare = await argon.verify(user.password, password);
    if (!pwdCompare) throw new ForbiddenException('Invalid Credentials');
    return this.signToken(user.id, user.email);
  }

  async getUsers() {
    return await this.prisma.user.findMany({
      include: {
        bookmarks: true,
      },
    });
  }

  async getUser(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: { bookmarks: true },
    });
  }
  async createUser(email: string, password: string) {
    const hashedPw = await argon.hash(password);
    return await this.prisma.user.create({
      data: {
        email: email,
        password: hashedPw,
      },
    });
  }

  async modifyName(
    id: number,
    firstName?: string,
    middleName?: string,
    lastName?: string,
  ) {
    return await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        firstName: firstName!,
        lastName: lastName!,
        middleName: middleName!,
      },
    });
  }

  async deleteUser(id: number) {
    return await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }

  signToken = async (
    id: number,
    email: string,
  ): Promise<{ access_token: string }> => {
    const user = this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    const name = (await user).firstName;
    const data = {
      sub: id,
      email: email,
      name: name,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(data, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  };
}
