import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwTGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/decorator';
import { CreateBookmarkDto, EditBookMarkDto } from './dto';

@UseGuards(JwTGuard)
@Controller('bookmark')
export class BookmarkController {
  constructor(private bookMarkService: BookmarkService) {}
  @Get()
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookMarkService.getBookmarks(userId);
  }
  @Get(':id')
  getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseArrayPipe) bookMarkId: number,
  ) {
    return this.bookMarkService.getBookmarkById(userId, bookMarkId);
  }
  @Post()
  createBookmark(@GetUser('id') id: number, @Body() dto: CreateBookmarkDto) {
    return this.bookMarkService.createBookmark(id, dto);
  }
  @Patch(':id')
  editBookMarkbyId(
    @GetUser('id') userId: number,
    @Body() dto: EditBookMarkDto,
    @Param('id', ParseArrayPipe) bookMarkId: number,
  ) {
    return this.bookMarkService.editBookMarkbyId(userId, dto, bookMarkId);
  }
  @Delete(':id')
  deleteBookmarkbyId(
    @GetUser('id') userId: number,
    @Param('id', ParseArrayPipe) bookMarkId: number,
  ) {
    return this.bookMarkService.deleteBookmarkbyId(userId, bookMarkId);
  }
}
