import { Module } from '@nestjs/common';
import { AuthModule } from './main/auth/auth.module';
import { UserModule } from './main/user/user.module';
import { LikeModule } from './main/like/like.module';
import { MessageModule } from './main/message/message.module';
import { FirebaseModule } from './main/firebase/firebase.module';
import {ConfigModule} from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule, UserModule, LikeModule, MessageModule, FirebaseModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
