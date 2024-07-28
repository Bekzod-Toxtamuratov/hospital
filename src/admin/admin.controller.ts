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
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from './models/admin.models';
import { ActivateAdminDto } from './dto/activate_admin.dto';
import { Response } from 'express';
import { LoginAdminDto } from './dto/login_admin_dto';
import { CookieGetter } from '../decorators/cookie_getter_descorator';
import { AdminGuard } from '../guards/admin.guard';
import { SelfAdminGuard } from '../guards/admin.self.guard';
import { SelfDoctorGuard } from '../guards/doctor.self.guard';
import { CreatorAdminGuard } from '../guards/creator.guard';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from './dto/update.admin_parol';

@Controller('admin')
@ApiTags('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @HttpCode(200)
  @Post('activate')
  async activateAdmin(@Body() activateAdminDto: ActivateAdminDto) {
    return this.adminService.activateUser(activateAdminDto);
  }
  @UseGuards(AdminGuard)
  @HttpCode(200)
  @Post('logout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.logout(refreshToken, res);
  }

  @HttpCode(200)
  @Post('login')
  login(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.login(loginAdminDto, res);
  }

  @ApiOperation({ summary: 'create admin' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Admin,
  })
  @Post('signup')
  create(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.Adminregistration(createAdminDto, res);
  }

  @HttpCode(200)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.refreshToken(+id, refreshToken, res);
  }
  //   *****************************CRUD boshlandi bu yerda;**********************
  @ApiOperation({ summary: 'get ALL admin' })
  @ApiResponse({
    status: 200,
    description: 'admin is ',
    type: [Admin],
  })
  @UseGuards(CreatorAdminGuard)
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: 'get byId admin' })
  @ApiResponse({
    status: 200,
    description: '',
    type: [Admin],
  })
  @UseGuards(SelfAdminGuard)
  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(SelfAdminGuard)
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'update admin' })
  @ApiResponse({
    status: 200,
    description: '',
    type: [Admin],
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @UseGuards(SelfAdminGuard)
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'delete admin' })
  @ApiResponse({
    status: 200,
    description: '',
    type: [Admin],
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }

  @HttpCode(200)
  @Post('activate')
  async activateUser(@Body() activateAdminDto: ActivateAdminDto) {
    return this.adminService.activateUser(activateAdminDto);
  }

  @UseGuards(SelfDoctorGuard)
  @UseGuards(AdminGuard)
  @Patch('update-password/:id')
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.adminService.updatePassword(+id, updatePasswordDto);
  }
}
