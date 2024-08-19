import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.models';
import { ActivateAdminDto } from './dto/activate_admin.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { LoginAdminDto } from './dto/login_admin_dto';
import { UpdatePasswordDto } from './dto/update.admin_parol';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private readonly AdminRepo: typeof Admin,
    private readonly jwtService: JwtService,
  ) {}
  async getTokens(admin: Admin) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEYAdmin,
        expiresIn: process.env.ACCESS_TOKEN_TIMEAdmin,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEYAdmin,
        expiresIn: process.env.REFRESH_TOKEN_TIMEAdmin,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
  async Adminregistration(createAdminDto: CreateAdminDto, res: Response) {
    const admin = await this.AdminRepo.findOne({
      where: {
        login: createAdminDto.login,
      },
    });
    if (admin) {
      throw new BadRequestException('This login is already registered');
    }
    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
    const newAdmin = await this.AdminRepo.create({
      ...createAdminDto,
      hashed_password,
    });
    const tokens = await this.getTokens(newAdmin);

    console.log(`admin's tokens`, tokens);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updateAdmin = await this.AdminRepo.update(
      { hashed_refresh_token },
      {
        where: { id: newAdmin.id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'admin registered ',
      admin: updateAdmin[1][0],
      tokens,
    };
    return response;
  }

  async login(loginAdminDto: LoginAdminDto, res: Response) {
    const { login, password } = loginAdminDto;
    const admin = await this.AdminRepo.findOne({ where: { login } });

    if (!admin) {
      throw new BadRequestException('admin not found');
    }
    if (!admin.is_active) {
      throw new BadRequestException('admin it not activated');
    }
    const isMatchPass = await bcrypt.compare(password, admin.hashed_password);
    if (!isMatchPass) {
      throw new BadRequestException('Password do not  match');
    }
    const tokens = await this.getTokens(admin);
    console.log('tokens ', tokens);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updateAdmin = await this.AdminRepo.update(
      { hashed_refresh_token },
      {
        where: { id: admin.id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'Admin logged in',
      user: updateAdmin[1][0],
      tokens,
    };
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const adminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEYAdmin,
    });
    if (!adminData) {
      throw new ForbiddenException('admin not verifed');
    }

    const updateAdmin = await this.AdminRepo.update(
      {
        hashed_refresh_token: null,
      },
      {
        where: { id: adminData.id },
        returning: true,
      },
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'admin logged out successfully',
      admin_refresh_token: updateAdmin[1][0].hashed_refresh_token,
    };
    return response;
  }

  async refreshToken(adminId: number, refreshToken: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refreshToken);

    if (adminId !== decodedToken['id']) {
      throw new BadRequestException('Ruxsat etilamgan ');
    }

    const admin = await this.AdminRepo.findOne({ where: { id: adminId } });

    if (!admin || !admin.hashed_refresh_token) {
      throw new BadRequestException('admin not found');
    }
    const tokenMatch = await bcrypt.compare(
      refreshToken,
      admin.hashed_refresh_token,
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }
    const tokens = await this.getTokens(admin);
    console.log('tokens ', tokens);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updateUser = await this.AdminRepo.update(
      { hashed_refresh_token },
      {
        where: { id: admin.id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'Admin refreshed',
      user: updateUser[1][0],
      tokens,
    };
    return response;
  }

  findAll() {
    return this.AdminRepo.findAll();
  }

  async findOne(id: number) {
    const adminData = await this.AdminRepo.findByPk(id);

    if (!adminData) {
      throw new NotFoundException(`admin type with ID ${id} not found`);
    }
    return adminData;
  }

  // admin shartmas
  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const [numberOfAffectedRows, [updatedADmin]] = await this.AdminRepo.update(
      updateAdminDto,
      {
        where: { id },
        returning: true,
      },
    );
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`admin with ID ${id} not found`);
    }
    return updatedADmin;
  }

  async remove(id: number) {
    try {
      const affectedRows = await this.AdminRepo.destroy({
        where: { id },
      });
      if (affectedRows > 0) {
        return `admin with ID ${id} was removed successfully.`;
      } else {
        return `admin with ID ${id} not found.`;
      }
    } catch (error) {
      throw new Error(`Error removing admin with ID ${id}: ${error.message}`);
    }
  }

  // *****************************************************************
  async activateUser(activateAdminDto: ActivateAdminDto) {
    const admin = await this.AdminRepo.findByPk(activateAdminDto.adminId);
    if (admin) {
      admin.is_active = true;
      await admin.save();
      return admin;
    }
    throw new NotFoundException('admin topilmadi');
  }

  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    const { old_password, new_password, confirm_password } = updatePasswordDto;

    const admin = await this.AdminRepo.findOne({ where: { id } });

    if (!admin) {
      throw new NotFoundException(`admin with ID ${id} not found`);
    }
    const isMatch = await bcrypt.compare(old_password, admin.hashed_password);
    if (!isMatch) {
      throw new BadRequestException('Old password is incorrect');
    }
    if (new_password !== confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }
    const hashed_password = await bcrypt.hash(new_password, 7);
    const updatedadmin = await this.AdminRepo.update(
      { hashed_password },
      { where: { id } },
    );
    return { message: 'Password successfully updated', updatedadmin };
  }
}
