import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { Gender } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { FirebaseUserService } from '../service/firebase.user.service';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly firebaseService: FirebaseUserService,
    private readonly userService: UserService,
  ) {}


  @Get('home')
  async getOpponents(@Query('gender') gender: Gender) {
    return this.prisma.user.findMany({ where: { gender } });
  }
  @Get('all-users')
  async getUser() {
    return this.userService.getUser();
  }

}
