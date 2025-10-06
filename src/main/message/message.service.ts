import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  async sendMessage(dto: CreateMessageDto) {
    const { senderId, receiverId, text } = dto;
    return this.prisma.message.create({
      data: { senderId, receiverId, text },
      include: {
        sender: true,
        receiver: true,
      },
    });
  }

  async getConversation(userId1: string, userId2: string) {
    return this.prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId1, receiverId: userId2 },
          { senderId: userId2, receiverId: userId1 },
        ],
      },
      orderBy: { createdAt: 'asc' },
      include: { sender: true, receiver: true },
    });
  }
}
