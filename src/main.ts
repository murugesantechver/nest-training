import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LoggerService } from './infrastructure/logger/logger.service';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    bufferLogs: true,
  });

  const globalPrefix = 'my-hotel/api';
  // 🔹 Global API prefix
  app.setGlobalPrefix( globalPrefix );

  // 🔹 Enable URL-based versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // 🔹 Swagger config
  const config = new DocumentBuilder()
    .setTitle('My Hotel API')
    .setDescription('Enterprise Hotel Management APIs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(`${globalPrefix}/docs`, app, document);


  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }
  ));


  const logger = app.get(LoggerService);
  app.useLogger(logger);

  app.useGlobalFilters(new AllExceptionsFilter(logger));
  

  
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
