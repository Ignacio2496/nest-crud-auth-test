import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}
  getEvents() {
    return this.prisma.events.findMany();
  }
  getEvent(eventId: number) {
    const e = parseInt(eventId[0]);
    return this.prisma.events.findUnique({
      where: {
        id: e,
      },
    });
  }
  async publishEvent(userId: number, dto: CreateEventDto) {
    const event = await this.prisma.events.create({
      data: { userId: userId, ...dto },
    });
    return event;
  }
  async updateEvent(dto: any, eventId: number) {
    const e = parseInt(eventId[0]);
    const event = await this.prisma.events.findUnique({
      where: {
        id: e,
      },
    });
    return this.prisma.events.update({
      where: {
        id: e,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteEvent(userId: number, eventId: number) {
    const e = parseInt(eventId[0]);
    const event = await this.prisma.events.findUnique({
      where: {
        id: e,
      },
    });
    await this.prisma.events.delete({
      where: {
        id: e,
      },
    });
  }
}
