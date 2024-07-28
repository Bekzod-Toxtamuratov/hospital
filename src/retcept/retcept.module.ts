import { Module } from '@nestjs/common';
import { RetceptService } from './retcept.service';
import { RetceptController } from './retcept.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Retcept } from './models/retcept.models';

@Module({
  imports: [SequelizeModule.forFeature([Retcept])],
  controllers: [RetceptController],
  providers: [RetceptService],
})
export class RetceptModule {}
