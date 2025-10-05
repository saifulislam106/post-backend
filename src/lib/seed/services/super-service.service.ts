import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { ENVEnum } from '@project/common/enum/env.enum';
// import { PrismaService } from '@project/lib/prisma/prisma.service';
// import { UtilsService } from '@project/lib/utils/utils.service';
import chalk from 'chalk';
import { ENVEnum } from 'src/common/enum/env.enum';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { HelpersService } from 'src/lib/helpers/helpers.service';

@Injectable()
export class SuperAdminService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utils: HelpersService,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit(): Promise<void> {
    return this.seedSuperAdminUser();
  }

  async seedSuperAdminUser(): Promise<void> {
    const superAdminEmail = this.configService.getOrThrow<string>(
      ENVEnum.SUPER_ADMIN_EMAIL,
    );
    const superAdminPass = this.configService.getOrThrow<string>(
      ENVEnum.SUPER_ADMIN_PASS,
    );

    const superAdminExists = await this.prisma.user.findFirst({
      where: {
        email: superAdminEmail,
      },
    });

    // * create super admin
    if (!superAdminExists) {
      await this.prisma.user.create({
        data: {
          email: superAdminEmail,
          password: await this.utils.hash(superAdminPass),
          name: 'Super Admin',
          role: 'SUPERADMIN',
          phone: 1234567890,

        //   isVerified: true,
        //   isActive: true,
        },
      });
      console.info(
        chalk.bgGreen.white.bold(
          `🚀 Super Admin user created with email: ${superAdminEmail}`,
        ),
      );
      return;
    }

    // * Log & update if super admin already exists
    await this.prisma.user.update({
      where: {
        email: superAdminEmail,
      },
      data: {
        // isActive: true,
        // isVerified: true,
        role: 'SUPERADMIN',
      },
    });
    console.info(
      chalk.bgGreen.white.bold(
        `🚀 Super Admin user exists with email: ${superAdminEmail}`,
      ),
    );
  }
}
