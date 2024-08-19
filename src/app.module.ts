import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Telegraf } from 'telegraf';
import { TelegrafModule } from 'nestjs-telegraf';
import { BOT_NAME } from './add.constants';
import { DepartmentModule } from './department/department.module';
import { Department } from './department/models/department.models';
import { RetceptModule } from './retcept/retcept.module';
import { PaymentModule } from './payment/payment.module';
import { Payment } from './payment/models/payment.models';
import { AppointmentModule } from './appointment/appointment.module';
import { Appointment } from './appointment/models/appointment.models';
import { RoomModule } from './room/room.module';
import { DoctorModule } from './doctor/doctor.module';
import { Doctor } from './doctor/models/doctor.models';
import { Room } from './room/models/room.models';
import { Retcept } from './retcept/models/retcept.models';
import { Admin } from './admin/models/admin.models';
import { PatientModule } from './patient/patient.module';
import { Patient } from './patient/models/patient.models';
import { AdminModule } from './admin/admin.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        Department,
        Payment,
        Appointment,
        Doctor,
        Room,
        Retcept,
        Admin,
        Patient,
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    DepartmentModule,
    RetceptModule,
    PaymentModule,
    AppointmentModule,
    RoomModule,
    DoctorModule,
    PatientModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
