import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageService } from '../message.service';
import { CreateMessageDto } from '../dto/create-message.dto';

@WebSocketGateway(4000,{ cors: {
  origin:true,
  credentials: true
}
, transports: ['websocket','polling'] })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessageService) {}

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: CreateMessageDto) {
    const { senderId, receiverId, text } = data;
    const message = await this.messagesService.sendMessage(data);
    this.server.to(receiverId).emit('message', message);
    this.server.to(senderId).emit('message', message);
  }

  handleConnection(client: any) {
    const userId = client.handshake.query.userId;
    client.join(userId);
  }
}
