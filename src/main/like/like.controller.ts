import { Controller, Post, Param, Req } from '@nestjs/common';
import { LikeService } from './like.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Controller('like')
export class LikeController {
  constructor(
    private readonly likeService: LikeService,
    private readonly prisma: PrismaService,
  ) {}

  @Post(':toUserId')
  async likeUser(@Param('toUserId') toUserId: string, @Req() req) {
    const fromUserId = req.user.id;
    const like = await this.prisma.like.create({
      data: { fromUserId, toUserId },
    });

    // Check match
    const reverseLike = await this.prisma.like.findFirst({
      where: { fromUserId: toUserId, toUserId: fromUserId },
    });
    if (reverseLike) {
      await this.prisma.like.update({
        where: { id: like.id },
        data: { matched: true },
      });
      await this.prisma.like.update({
        where: { id: reverseLike.id },
        data: { matched: true },
      });
    }

    return like;
  }
}
