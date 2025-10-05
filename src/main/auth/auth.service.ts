import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateAuthDto, LoginDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: CreateAuthDto) {
   try{
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    })
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }
     const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: { ...dto, password: hashedPassword },
    });
    return user;
   }catch(err){
    // console.log(err);
    return err
   }
  }

  
  async signin(dto: LoginDto) {
   try{
     const { email, password } = dto;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid credentials');

    const payload={
      id:user.id,
      email:user.email,
      role:user.role
    }

    const token =await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1d',
    });
    
    // const token = await this.jwtService.signAsync(payload);
    console.log(token);
    return { user, token };
   }catch(err){
    console.log(err);
    return err
   }
  }
}
