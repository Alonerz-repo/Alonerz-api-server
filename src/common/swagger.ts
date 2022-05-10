import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { bearerConfig } from './configs';

const init = {
  title: 'Alonerz API',
  description: '팀 얼로너즈 API 입니다.',
  version: '1.0.0',
};

export const useSwagger = (app: INestApplication) => {
  const swagger = new DocumentBuilder()
    .setTitle(init.title)
    .setDescription(init.description)
    .setVersion(init.version)
    .addServer(
      'http://expressapi-env.eba-fqnmpfnx.ap-northeast-2.elasticbeanstalk.com/api',
    )
    .addServer('http://localhost:5000/api')
    .addBearerAuth(bearerConfig, 'AccessToken')
    .build();
  const docs = SwaggerModule.createDocument(app, swagger);
  return SwaggerModule.setup('/', app, docs);
};
