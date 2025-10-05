import { Module } from '@nestjs/common';
import { HelpersService } from './helpers.service';

@Module({
  controllers: [],
  providers: [HelpersService],
})
export class HelpersModule {}
