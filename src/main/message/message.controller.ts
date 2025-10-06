import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messagesService: MessageService) {}

  
  @Post()
  sendMessage(
    @Body() dto: CreateMessageDto,
    
  ) {
    return this.messagesService.sendMessage(dto);
  }

  @Get()
  getConversation(
    @Query('user1') user1: string,
    @Query('user2') user2: string,
  ) {
    return this.messagesService.getConversation(user1, user2);
  }
}
