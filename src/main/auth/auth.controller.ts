import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, LoginDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: CreateAuthDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: LoginDto) {
    return this.authService.signin(dto);
  }
}
