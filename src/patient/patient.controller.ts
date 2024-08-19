import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CookieGetter } from '../decorators/cookie_getter_descorator';

import { Response } from 'express';
import { LoginPatientDto } from './dto/login-patient.dto';
import { AdminGuard } from '../guards/admin.guard';
import { PatientGuard } from '../guards/patient.guard';
import { DoctorGuard } from '../guards/doctor.guard';
import { SelfAdminGuard } from '../guards/admin.self.guard';
import { SelfPatientGuard } from '../guards/patient.self.guard';
import { UpdatePassworPatientdDto } from './dto/update.password.patient';

@Controller('patient')
@ApiTags('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @ApiOperation({ summary: 'register users' })
  @ApiResponse({
    status: 201,
    description: 'The signup created.',
  })
  @Post('signup')
  create(
    @Body() createpatientDto: CreatePatientDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.patientService.registration(createpatientDto, res);
  }

  @HttpCode(200)
  @Post('sigin')
  login(
    @Body() loginpatientDto: LoginPatientDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.patientService.login(loginpatientDto, res);
  }

  @HttpCode(200)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.patientService.refreshToken(+id, refreshToken, res);
  }

  @UseGuards(PatientGuard)
  @HttpCode(200)
  @Post('logout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.patientService.logout(refreshToken, res);
  }

  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.patientService.activate(link);
  }

  @ApiOperation({ summary: 'getALL patients' })
  @ApiResponse({
    status: 200,
    description: 'get ALL patients.',
  })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @UseGuards(DoctorGuard)
  @Get('/doctor')
  findAllDoctor() {
    return this.patientService.findAll();
  }

  @ApiOperation({ summary: 'get ById patient' })
  @ApiResponse({
    status: 200,
    description: 'get byId patient',
  })
  @UseGuards(PatientGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(+id);
  }
  @UseGuards(AdminGuard)
  @Get(':id/admin')
  findOneForAdmin(@Param('id') id: string) {
    return this.patientService.findOne(+id);
  }
  @UseGuards(DoctorGuard)
  @Get(':id/doctor')
  findOneForDoctor(@Param('id') id: string) {
    return this.patientService.findOne(+id);
  }

  @ApiOperation({ summary: 'patch  patient' })
  @ApiResponse({
    status: 200,
    description: 'patch patient',
  })
  @UseGuards(SelfPatientGuard)
  @UseGuards(PatientGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(+id, updatePatientDto);
  }

  @UseGuards(AdminGuard)
  @Patch(':id/admin')
  updateAdmin(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    return this.patientService.update(+id, updatePatientDto);
  }

  @ApiOperation({ summary: 'delete  patient' })
  @ApiResponse({
    status: 200,
    description: 'delete patient',
  })
  @UseGuards(SelfPatientGuard)
  @UseGuards(PatientGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(+id);
  }

  @UseGuards(SelfPatientGuard)
  @UseGuards(PatientGuard)
  @Patch('update-password/:id')
  updatePassword(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePassworPatientdDto,
  ) {
    return this.patientService.updatePassword(+id, updatePatientDto);
  }
}
