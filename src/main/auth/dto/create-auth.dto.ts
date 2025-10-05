import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({ example: 'VbS5o@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 12345678 })
  @IsNumber()
  phone: number;

  @ApiProperty({ example: '12345678' })
  @IsString()
  password: string;
}

export class LoginDto {
  @ApiProperty({ example: 'VbS5o@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678' })
  @IsString()
  password: string;
}
