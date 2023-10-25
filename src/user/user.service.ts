import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async getUser(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }
  async createUser(email: string, password: string) {
    const hashedPw = await argon.hash(password);
    return await this.prisma.user.create({
      data: {
        email: email,
        hash: hashedPw,
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
}
