import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { API_V1_DOCS_STR, API_V1_STR } from './config/configuration';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ResolvePromisesInterceptor } from './core/utils/serializer.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix(configService.get<string>(API_V1_STR));

  const config = new DocumentBuilder()
    .setTitle('Surveys')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    configService.get<string>(API_V1_DOCS_STR),
    app,
    document,
  );

  app.useGlobalInterceptors(
    // ResolvePromisesInterceptor is used to resolve promises in responses because class-transformer can't do it
    // https://github.com/typestack/class-transformer/issues/549
    new ResolvePromisesInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));

  await app.listen(3000);
}
bootstrap();
