import { Module } from '@nestjs/common';
import { FileModule } from './file/file.module';
import { MailModule } from './mail/mail.module';
import { SeedModule } from './seed/seed.module';
import { MulterModule } from './multer/multer.module';
import { HelpersModule } from './helpers/helpers.module';

@Module({
  imports: [
    SeedModule,
    MailModule,
    FileModule,
    MulterModule,
    HelpersModule,
  ],
  exports: [],
  providers: [],
})
export class LibModule {}