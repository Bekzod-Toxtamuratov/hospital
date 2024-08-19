import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { Response } from 'express';
import { CookieGetter } from '../decorators/cookie_getter_descorator';
import { DoctorGuard } from '../guards/doctor.guard';
import { LoginDoctorDto } from './dto/login.doctor.dto';
import { Doctor } from './models/doctor.models';
import { Use } from 'nestjs-telegraf';
import { SelfDoctorGuard } from '../guards/doctor.self.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdatePasswordDoctorDto } from './dto/update_password.dto';
import { AdminGuard } from '../guards/admin.guard';

@Controller('doctor')
@ApiTags('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @ApiOperation({ summary: 'register users' })
  @ApiResponse({
    status: 201,
    description: 'The signup created.',
    type: Doctor,
  })
  @Post('signup')
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createDoctorDto: CreateDoctorDto,
    @UploadedFile() image: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.doctorService.registration(createDoctorDto, res, image);
  }

  @HttpCode(200)
  @Post('sigin')
  login(
    @Body() loginDoctorDto: LoginDoctorDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.doctorService.login(loginDoctorDto, res);
  }

  @HttpCode(200)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.doctorService.refreshToken(+id, refreshToken, res);
  }

  @UseGuards(DoctorGuard)
  @HttpCode(200)
  @Post('logout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.doctorService.logout(refreshToken, res);
  }

  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.doctorService.activate(link);
  }

  // *******************************CRUD ****************************************
  @ApiOperation({ summary: 'getALL doctors' })
  @ApiResponse({
    status: 200,
    description: 'get ALL doctors.',
    type: Doctor,
  })
  // doctorlarni royhatni hamma kora olish kerak boladi bizda;
  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  

  @ApiOperation({ summary: 'get ById doctor' })
  @ApiResponse({
    status: 200,
    description: 'get byId doctor',
    type: Doctor,
  })
  @UseGuards(SelfDoctorGuard)
  @UseGuards(DoctorGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @Get(':id/admin')
  findOneAdmin(@Param('id') id: string) {
    return this.doctorService.findOne(+id);
  }

  @ApiOperation({ summary: 'patch  doctor' })
  @ApiResponse({
    status: 200,
    description: 'patch doctor',
    type: Doctor,
  })
  @UseGuards(SelfDoctorGuard)
  @UseGuards(DoctorGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(+id, updateDoctorDto);
  }

  @ApiOperation({ summary: 'delete  doctor' })
  @ApiResponse({
    status: 200,
    description: 'delete doctor',
    type: Doctor,
  })
  @UseGuards(SelfDoctorGuard)
  @UseGuards(DoctorGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(+id);
  }
}
