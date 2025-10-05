import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'src/common/prisma/prisma.module';

@Module({
  // imports: [
  //   // PassportModule.register({ session: false }),
  //   PrismaModule,
  //   JwtModule.registerAsync({
  //     imports: [ConfigModule],
  //     inject: [ConfigService],
  //     useFactory: async (config: ConfigService) => {
  //       console.log('JWT_SECRET:', config.get<string>('JWT_SECRET'));
  //       return {
  //         secret: config.get<string>('JWT_SECRET'),
  //         signOptions: { expiresIn: '1d' },
  //       }
  //     },
  //   }),
  // ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtService],
})
export class AuthModule {}
