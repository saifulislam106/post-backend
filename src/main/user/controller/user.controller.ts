import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { Gender } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { FirebaseUserService } from '../service/firebase.user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: FirebaseUserService,
  ) {}

  @Get('home')
  async getOpponents(@Query('gender') gender: Gender) {
    return this.prisma.user.findMany({ where: { gender } });
  }

}
