import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Doctor } from './models/doctor.models';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { FileModule } from '../file/file.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Doctor]),
    FileModule, // Include FileModule separately
    JwtModule.register({}),
    MailModule,
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
