import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

const start = async () => {
  try {
    const config = new DocumentBuilder()
      .setTitle('Stadium  finder')
      .setDescription('Mini project for stadium finder')
      .setVersion('1.0.0')
      .addTag(
        'validation, swagger, Nestjs, Sequelize, JWT, Swagger, Bot, SMS, Mailer',
      )
      .build();

    const PORT = process.env.PORT || 3333;
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');


    app.useGlobalPipes(new ValidationPipe()); // ozini standart pipe bu

    // app.useGlobalPipes(new CustomValidationPipe());

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}-portda ishga tushdi `);
    });
  } catch (error) {
    console.log('error ', error);
  }
};
start();
