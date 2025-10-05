import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT') ?? 3000;


  const config = new DocumentBuilder()
    .setTitle('Dating App API')
    .setDescription('The API documentation for Dating App project')
    .setVersion('1.0')
    .addBearerAuth() // JWT Auth হলে
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port);
}
bootstrap();
