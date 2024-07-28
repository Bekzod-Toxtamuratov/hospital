import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Appointment } from './models/appointment.models';
import { AdminGuard } from '../guards/admin.guard';
import { SelfDoctorGuard } from '../guards/doctor.self.guard';
import { Doctor } from '../doctor/models/doctor.models';
import { DoctorGuard } from '../guards/doctor.guard';

@Controller('appointment')
@ApiTags('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @ApiOperation({ summary: 'bu yerda qoshilad' })
  @ApiResponse({
    status: 201,
    description: 'The signup created.',
    type: Appointment,
  })
  @UseGuards(AdminGuard)
  @Post()
  @UseGuards(SelfDoctorGuard)
  @UseGuards(DoctorGuard)
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @ApiOperation({ summary: 'bu yerda qoshilad' })
  @ApiResponse({
    status: 200,
    description: 'The signup created.',
    type: [Appointment],
  })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }
  @UseGuards(DoctorGuard)
  @Get()
  findAllDoctor() {
    return this.appointmentService.findAll();
  }

  @ApiOperation({ summary: 'bu yerda qoshilad' })
  @ApiResponse({
    status: 200,
    description: 'The signup created.',
    type: Appointment,
  })
  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(+id);
  }
  @UseGuards(SelfDoctorGuard)
  @UseGuards(DoctorGuard)
  @Get(':id/doctor')
  findOneDoctor(@Param('id') id: string) {
    return this.appointmentService.findOne(+id);
  }

  @ApiOperation({ summary: 'bu yerda qoshilad' })
  @ApiResponse({
    status: 200,
    description: 'The signup created.',
    type: Appointment,
  })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

  @ApiOperation({ summary: 'bu yerda qoshilad' })
  @ApiResponse({
    status: 200,
    description: 'The signup created.',
    type: Appointment,
  })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }
}
