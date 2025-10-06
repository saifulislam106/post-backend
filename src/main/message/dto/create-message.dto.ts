import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ example: '2578907432475' })
  @IsString()
  @IsNotEmpty()
  senderId: string;

  @ApiProperty({ example: '243908708240' })
  @IsString()
  @IsNotEmpty()
  receiverId: string;

  @ApiProperty({ example: 'Hello' })
  @IsString()
  @IsNotEmpty()
  text: string;
}
