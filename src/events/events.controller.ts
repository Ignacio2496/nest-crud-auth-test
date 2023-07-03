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
import { EventsService } from './events.service';
import { JwTGuard } from 'src/auth/guard';
import { CreateBookmarkDto } from 'src/bookmark/dto';
import { GetUser } from 'src/auth/decorator';
import { CreateEventDto, EditEventDto } from './dto';

@UseGuards(JwTGuard)
@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}
  @Post()
  publishEvent(@GetUser('id') userId: number, @Body() dto: CreateEventDto) {
    return this.eventsService.publishEvent(userId, dto);
  }
  @Get()
  getEvents() {
    return this.eventsService.getEvents();
  }
  @Get(':id')
  getEvent(@Param('id', ParseArrayPipe) eventId: number) {
    return this.eventsService.getEvent(eventId);
  }
  @Patch(':id')
  updateEvent(@Body() dto: EditEventDto, @Param('id', ParseArrayPipe) eventId) {
    return this.eventsService.updateEvent(dto, eventId);
  }
  @Delete(':id')
  deleteEvent(
    @GetUser('id') userId: number,
    @Param('id', ParseArrayPipe) eventId,
  ) {
    return this.eventsService.deleteEvent(userId, eventId);
  }
}
