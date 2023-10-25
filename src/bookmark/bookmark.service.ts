import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async getBookmarks() {
    return await this.prisma.bookmark.findMany();
  }

  async getBookmarkByUser(id: number) {
    return await this.prisma.bookmark.findMany({
      where: {
        userId: id,
      },
    });
  }

  async createBookmark(userId: number, title: string, link: string) {
    return await this.prisma.bookmark.create({
      data: {
        title: title,
        link: link,
        userId: userId,
      },
    });
  }

  async modifyBookmark(
    id: number,
    title?: string,
    description?: string,
    link?: string,
  ) {
    return await this.prisma.bookmark.update({
      where: {
        id: id,
      },
      data: {
        title: title!,
        description: description!,
        link: link!,
      },
    });
  }

  async deleteBookmark(id: number) {
    return await this.prisma.bookmark.delete({
      where: {
        id: id,
      },
    });
  }
}
