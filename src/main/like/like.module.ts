import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  controllers: [LikeController],
  providers: [LikeService, PrismaService],
})
export class LikeModule {}
