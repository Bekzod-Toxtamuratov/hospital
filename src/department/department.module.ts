import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Department } from './models/department.models';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([Department]),JwtModule],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
