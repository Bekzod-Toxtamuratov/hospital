import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Doctor } from './models/doctor.models';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import * as bcrypt from 'bcrypt';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Op } from 'sequelize';
import { v4 } from 'uuid';
import { Response } from 'express';
import { LoginDoctorDto } from './dto/login.doctor.dto';
import { FileService } from '../file/file.service';
import { UpdatePasswordDoctorDto } from './dto/update_password.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor)
    private readonly doctorRepo: typeof Doctor,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly fileService: FileService,
  ) {}
  async getTokens(doctor: Doctor) {
    const payload = {
      id: doctor.id,
      is_active: doctor.is_active,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEYDoctor,
        expiresIn: process.env.ACCESS_TOKEN_TIMEDoctor,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEYDoctor,
        expiresIn: process.env.REFRESH_TOKEN_TIMEDoctor,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
  /*  async create(createVenuePhotoDto: CreateVenuePhotoDto, image: any) {
    const fileName = await this.fileService.saveFile(image);
    console.log("fileName  ", fileName);
    const venue_photo = await this.venue_photoRepo.create({
      ...createVenuePhotoDto,
      image: fileName,
    });
    return venue_photo;
  } */
  async registration(
    createdoctorDto: CreateDoctorDto,
    res: Response,
    image: any,
  ) {
    const fileName = await this.fileService.saveFile(image);
    console.log('fileName  ', fileName);

    const doctor = await this.doctorRepo.findOne({
      where: {
        email: createdoctorDto.email,
      },
    });
    if (doctor) {
      throw new BadRequestException('This email is already registered');
    }
    if (createdoctorDto.password !== createdoctorDto.confirm_password) {
      throw new BadRequestException('Password  lar bir birga most emas');
    }

    const hashed_password = await bcrypt.hash(createdoctorDto.password, 7);

    const newdoctor = await this.doctorRepo.create({
      ...createdoctorDto,
      hashed_password,
      image: fileName,
    });
    const tokens = await this.getTokens(newdoctor);

    console.log('tokens ', tokens);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const activation_link = v4();

    console.log('activation link ', activation_link);

    const updatedoctor = await this.doctorRepo.update(
      { hashed_refresh_token, activation_link },
      {
        where: { id: newdoctor.id },
        returning: true,
      },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    try {
      await this.mailService.sendMail(updatedoctor[1][0]);
    } catch (error) {
      console.log('error', error);
      throw new BadRequestException('Xatni yuborishda xatolik');
    }

    const response = {
      message: 'doctor registered ',
      doctor: updatedoctor[1][0],
      tokens,
    };
    return response;
  }
  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link is required');
    }

    const updateddoctor = await this.doctorRepo.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );
    if (!updateddoctor[1][0]) {
      throw new BadRequestException('doctor already activated');
    }
    const response = {
      message: 'doctor activated successfully',
      doctor: updateddoctor[1][0].is_active,
    };

    return response;
  }

  async login(logindoctorDto: LoginDoctorDto, res: Response) {
    const { email, password } = logindoctorDto;
    const doctor = await this.doctorRepo.findOne({ where: { email } });

    if (!doctor) {
      throw new BadRequestException('doctor not found');
    }
    if (!doctor.is_active) {
      throw new BadRequestException('doctor it not activated');
    }
    const isMatchPass = await bcrypt.compare(password, doctor.hashed_password);
    if (!isMatchPass) {
      throw new BadRequestException('Password do not  match');
    }
    const tokens = await this.getTokens(doctor);
    console.log('tokens ', tokens);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatedoctor = await this.doctorRepo.update(
      { hashed_refresh_token },
      {
        where: { id: doctor.id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'doctor logged in',
      doctor: updatedoctor[1][0],
      tokens,
    };
    return response;
  }
  async logout(refreshToken: string, res: Response) {
    const doctorData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEYDoctor,
    });
    if (!doctorData) {
      throw new ForbiddenException('doctor not verifed');
    }

    const updatedoctor = await this.doctorRepo.update(
      {
        hashed_refresh_token: null,
      },
      {
        where: { id: doctorData.id },
        returning: true,
      },
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'doctor logged out successfully',
      doctor_refresh_token: updatedoctor[1][0].hashed_refresh_token,
    };
    return response;
  }

  async refreshToken(doctorId: number, refreshToken: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refreshToken);

    if (doctorId !== decodedToken['id']) {
      throw new BadRequestException('Ruxsat etilamgan ');
    }

    const doctor = await this.doctorRepo.findOne({ where: { id: doctorId } });

    if (!doctor || !doctor.hashed_refresh_token) {
      throw new BadRequestException('doctor not found');
    }
    const tokenMatch = await bcrypt.compare(
      refreshToken,
      doctor.hashed_refresh_token,
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }
    const tokens = await this.getTokens(doctor);
    console.log('tokens ', tokens);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatedoctor = await this.doctorRepo.update(
      { hashed_refresh_token },
      {
        where: { id: doctor.id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'doctor refreshed',
      doctor: updatedoctor[1][0],
      tokens,
    };
    return response;
  }

  // ***********************CRUD BU YERDA *****************************************************8
  findAll() {
    return this.doctorRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const doctorData = await this.doctorRepo.findByPk(id);

    if (!doctorData) {
      throw new NotFoundException(`doctor type with ID ${id} not found`);
    }
    return doctorData;
  }

  async remove(id: number) {
    try {
      const affectedRows = await this.doctorRepo.destroy({
        where: { id },
      });
      if (affectedRows > 0) {
        return `doctor with ID ${id} was removed successfully.`;
      } else {
        return `doctor with ID ${id} not found.`;
      }
    } catch (error) {
      throw new Error(`Error removing doctor with ID ${id}: ${error.message}`);
    }
  }

  async update(id: number, updatedoctorDto: UpdateDoctorDto): Promise<Doctor> {
    const [numberOfAffectedRows, [updateddoctor]] =
      await this.doctorRepo.update(updatedoctorDto, {
        where: { id },
        returning: true,
      });
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`doctor with ID ${id} not found`);
    }
    return updateddoctor;
  }
  async updatePassword(
    id: number,
    udatePasswordDoctorDto: UpdatePasswordDoctorDto,
  ) {
    const { old_password, new_password, confirm_password } =
      udatePasswordDoctorDto;
    const doctor = await this.doctorRepo.findOne({
      where: { id },
    });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
    const isMatch = await bcrypt.compare(old_password, doctor.hashed_password);
    if (!isMatch) {
      throw new BadRequestException('Old password is incorrect');
    }
    if (new_password !== confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }
    const hashed_password = await bcrypt.hash(new_password, 7);
    const updatedDoctor = await this.doctorRepo.update(
      { hashed_password },
      { where: { id } },
    );
    return { message: 'Password successfully updated', updatedDoctor };
  }
}
