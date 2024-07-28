import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './models/patient.models';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import * as bcrypt from 'bcrypt';

import { Op } from 'sequelize';
import { v4 } from 'uuid';
import { Response } from 'express';
import { LoginPatientDto } from './dto/login-patient.dto';
import { UpdatePassworPatientdDto } from './dto/update.password.patient';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient)
    private readonly patientRepo: typeof Patient,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}
  async getTokens(patient: Patient) {
    const payload = {
      id: patient.id,
      is_active: patient.is_active,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEYPatient,
        expiresIn: process.env.ACCESS_TOKEN_TIMEPatient,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEYPatient,
        expiresIn: process.env.REFRESH_TOKEN_TIMEPatient,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
  async registration(createpatientDto: CreatePatientDto, res: Response) {
    const patient = await this.patientRepo.findOne({
      where: {
        email: createpatientDto.email,
      },
    });
    if (patient) {
      throw new BadRequestException('This email is already registered');
    }
    if (createpatientDto.password !== createpatientDto.confirm_password) {
      throw new BadRequestException('Password  lar bir birga most emas');
    }

    const hashed_password = await bcrypt.hash(createpatientDto.password, 7);
    const newpatient = await this.patientRepo.create({
      ...createpatientDto,
      hashed_password,
    });
    const tokens = await this.getTokens(newpatient);

    console.log('tokens ', tokens);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const activation_link = v4();

    console.log('activation link ', activation_link);

    const updatepatient = await this.patientRepo.update(
      { hashed_refresh_token, activation_link },
      {
        where: { id: newpatient.id },
        returning: true,
      },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    try {
      await this.mailService.sendMailPatient(updatepatient[1][0]);
    } catch (error) {
      console.log('error', error);
      throw new BadRequestException('Xatni yuborishda xatolik');
    }

    const response = {
      message: 'patient registered ',
      patient: updatepatient[1][0],
      tokens,
    };
    return response;
  }
  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link is required');
    }

    const updatedpatient = await this.patientRepo.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );
    if (!updatedpatient[1][0]) {
      throw new BadRequestException('patient already activated');
    }
    const response = {
      message: 'patient activated successfully',
      patient: updatedpatient[1][0].is_active,
    };

    return response;
  }

  async login(loginpatientDto: LoginPatientDto, res: Response) {
    const { email, password } = loginpatientDto;
    const patient = await this.patientRepo.findOne({ where: { email } });

    if (!patient) {
      throw new BadRequestException('patient not found');
    }
    if (!patient.is_active) {
      throw new BadRequestException('patient it not activated');
    }
    const isMatchPass = await bcrypt.compare(password, patient.hashed_password);
    if (!isMatchPass) {
      throw new BadRequestException('Password do not  match');
    }
    const tokens = await this.getTokens(patient);
    console.log('tokens ', tokens);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatepatient = await this.patientRepo.update(
      { hashed_refresh_token },
      {
        where: { id: patient.id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'patient logged in',
      patient: updatepatient[1][0],
      tokens,
    };
    return response;
  }
  async logout(refreshToken: string, res: Response) {
    const patientData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!patientData) {
      throw new ForbiddenException('patient not verifed');
    }
    const updatepatient = await this.patientRepo.update(
      {
        hashed_refresh_token: null,
      },
      {
        where: { id: patientData.id },
        returning: true,
      },
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'patient logged out successfully',
      patient_refresh_token: updatepatient[1][0].hashed_refresh_token,
    };
    return response;
  }

  async refreshToken(patientId: number, refreshToken: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refreshToken);

    if (patientId !== decodedToken['id']) {
      throw new BadRequestException('Ruxsat etilamgan ');
    }

    const patient = await this.patientRepo.findOne({
      where: { id: patientId },
    });

    if (!patient || !patient.hashed_refresh_token) {
      throw new BadRequestException('patient not found');
    }
    const tokenMatch = await bcrypt.compare(
      refreshToken,
      patient.hashed_refresh_token,
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }
    const tokens = await this.getTokens(patient);
    console.log('tokens ', tokens);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatepatient = await this.patientRepo.update(
      { hashed_refresh_token },
      {
        where: { id: patient.id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'patient refreshed',
      patient: updatepatient[1][0],
      tokens,
    };
    return response;
  }

  // ***********************CRUD BU YERDA *****************************************************8
  findAll() {
    return this.patientRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const patientData = await this.patientRepo.findByPk(id);

    if (!patientData) {
      throw new NotFoundException(`patient type with ID ${id} not found`);
    }
    return patientData;
  }

  async remove(id: number) {
    try {
      const affectedRows = await this.patientRepo.destroy({
        where: { id },
      });
      if (affectedRows > 0) {
        return `patient with ID ${id} was removed successfully.`;
      } else {
        return `patient with ID ${id} not found.`;
      }
    } catch (error) {
      throw new Error(`Error removing patient with ID ${id}: ${error.message}`);
    }
  }

  async update(
    id: number,
    updatepatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    const [numberOfAffectedRows, [updatedpatient]] =
      await this.patientRepo.update(updatepatientDto, {
        where: { id },
        returning: true,
      });
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`patient with ID ${id} not found`);
    }
    return updatedpatient;
  }

  async updatePassword(
    id: number,
    updatePassworPatientdDto: UpdatePassworPatientdDto,
  ) {
    const { old_password, new_password, confirm_password } =
      updatePassworPatientdDto;
    const patient = await this.patientRepo.findOne({ where: { id } });

    if (!patient) {
      throw new NotFoundException(`patient with ID ${id} not found`);
    }

    const isMatch = await bcrypt.compare(old_password, patient.hashed_password);
    if (!isMatch) {
      throw new BadRequestException('Old password is incorrect');
    }
    if (new_password !== confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }
    const hashed_password = await bcrypt.hash(new_password, 7);

    const updatedPatient = await this.patientRepo.update(
      { hashed_password },
      { where: { id } },
    );
    return { message: 'Password successfully updated', updatedPatient };
  }
}
