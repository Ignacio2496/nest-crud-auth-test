import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBookmarkDto, EditBookMarkDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  getBookmarks(userId: number) {
    return this.prisma.bookmark.findMany({
      where: {
        userId,
      },
    });
  }
  getBookmarkById(userId: number, bookMarkId: number) {
    const bookmark = parseInt(bookMarkId[0]);
    return this.prisma.bookmark.findFirst({
      where: {
        id: bookmark,
        userId,
      },
    });
  }

  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: { userId: userId, ...dto },
    });
    return bookmark;
  }

  async editBookMarkbyId(
    userId: number,
    dto: EditBookMarkDto,
    bookmarkId: number,
  ) {
    const BKid = parseInt(bookmarkId[0]);
    const bookmark = this.prisma.bookmark.findUnique({
      where: {
        id: BKid,
      },
    });
    if (!bookmark || (await bookmark).userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }
    return this.prisma.bookmark.update({
      where: {
        id: BKid,
      },
      data: {
        ...dto,
      },
    });
  }
  async deleteBookmarkbyId(userId: number, bookMarkId: number) {
    const BKid = parseInt(bookMarkId[0]);

    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: BKid,
      },
    });

    if (!bookMarkId || bookmark.userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }

    await this.prisma.bookmark.delete({
      where: {
        id: BKid,
      },
    });
  }
}
