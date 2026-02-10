import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv'

dotenv.config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe());

  const PORT = process.env.PORT!
  await app.listen(PORT);
  console.log(`Server running at port ${PORT}`)
}

void bootstrap();
