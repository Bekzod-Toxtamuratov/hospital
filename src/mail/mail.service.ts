import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';
import { Doctor } from '../doctor/models/doctor.models';
import { Patient } from '../patient/models/patient.models';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(doctor: Doctor) {
    const url = `${process.env.API_HOST}:${process.env.PORT}/api/doctor/activate/${doctor.activation_link}`;
    console.log(doctor.dataValues, 'Mail sent');
    console.log('url : ', url);
    await this.mailerService.sendMail({
      to: doctor.email,
      subject: 'welcome to hospital App! Comfirmation your email',
      template: './confirmation',
      context: {
        name: doctor.first_name,
        url,
      },
    });
  }
  async sendMailPatient(patient: Patient) {
    console.log('ok ', patient.email);
    console.log('ok ', patient.first_name);
    const url = `${process.env.API_HOST}:${process.env.PORT}/api/patient/activate/${patient.activation_link}`;
    console.log('url : ', url);
    await this.mailerService.sendMail({
      to: patient.email,
      subject: 'welcome to hospital App! Comfirmation your email',
      template: './confirmation',
      context: {
        name: patient.first_name,
        url,
      },
    });
  }
}
