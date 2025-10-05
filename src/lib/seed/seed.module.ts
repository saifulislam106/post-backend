import { Module } from '@nestjs/common';
import { FileService } from './services/file.service';
import { SuperAdminService } from './services/super-service.service';


@Module({
  controllers: [],
  providers: [FileService, SuperAdminService],
})
export class SeedModule {}
