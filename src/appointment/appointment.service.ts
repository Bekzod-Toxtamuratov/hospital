import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Appointment } from './models/appointment.models';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment)
    private readonly appointmentRepo: typeof Appointment,
  ) {}
  create(createappointmentDto: CreateAppointmentDto) {
    return this.appointmentRepo.create(createappointmentDto);
  }

  findAll() {
    return this.appointmentRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const appointmentData = await this.appointmentRepo.findByPk(id);

    if (!appointmentData) {
      throw new NotFoundException(`appointment type with ID ${id} not found`);
    }
    return appointmentData;
  }

  async remove(id: number) {
    try {
      const affectedRows = await this.appointmentRepo.destroy({
        where: { id },
      });
      if (affectedRows > 0) {
        return `appointment with ID ${id} was removed successfully.`;
      } else {
        return `appointment with ID ${id} not found.`;
      }
    } catch (error) {
      throw new Error(
        `Error removing appointment with ID ${id}: ${error.message}`,
      );
    }
  }

  async update(
    id: number,
    updateappointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    const [numberOfAffectedRows, [updatedappointment]] =
      await this.appointmentRepo.update(updateappointmentDto, {
        where: { id },
        returning: true,
      });
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`appointment with ID ${id} not found`);
    }
    return updatedappointment;
  }
}
