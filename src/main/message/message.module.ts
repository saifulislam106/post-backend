import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ChatGateway } from './gateway/chat.gateway';

@Module({
  controllers: [MessageController],
  providers: [MessageService, PrismaService, ChatGateway],
})
export class MessageModule {}
