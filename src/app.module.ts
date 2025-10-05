import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './main/auth/auth.module';
import { UserModule } from './main/user/user.module';
import { LikeModule } from './main/like/like.module';
import { MessageModule } from './main/message/message.module';
import { FirebaseModule } from './main/firebase/firebase.module';

@Module({
  imports: [AuthModule, UserModule, LikeModule, MessageModule, FirebaseModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
