import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Patient } from '../../patient/models/patient.models';
import { Doctor } from '../../doctor/models/doctor.models';
import { Room } from '../../room/models/room.models';

interface IDAppointCreationAttr {
  patientId: number;
  doctorId: number;
  roomId: number;
  data: string;
  time: string;
  diagnostik: string;
  treatments: string;
}
@Table({ tableName: 'appointment' })
export class Appointment extends Model<Appointment, IDAppointCreationAttr> {
  @ApiProperty({
    example: '1',
    description: ' Id unikal raqami',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'data',
    description: 'data data',
  })
  @Column({
    type: DataType.STRING,
  })
  data: string;

  @ApiProperty({
    example: 'time',
    description: 'time data',
  })
  @Column({
    type: DataType.STRING,
  })
  time: string;

  @ApiProperty({
    example: 'diagnostik',
    description: 'diagnostik data',
  })
  @Column({
    type: DataType.STRING,
  })
  diagnostik: string;

  @ApiProperty({
    example: 'treatments examples',
    description: 'tratment description',
  })
  @Column({
    type: DataType.STRING,
  })
  treatments: string;

  @ApiProperty({
    example: 'patientId examples',
    description: 'patientId description',
  })
  @Column({
    type: DataType.INTEGER,
  })
  // @ForeignKey(() => Patient)
  patientId: number;

  @ApiProperty({
    example: 'doctorId examples',
    description: 'doctorId description',
  })
  @Column({
    type: DataType.INTEGER,
  })
  // @ForeignKey(() => Doctor)
  doctorId: number;

  @ApiProperty({
    example: 'roomId examples',
    description: 'roomId description',
  })
  @Column({
    type: DataType.INTEGER,
  })
  // @ForeignKey(() => Room)
  roomId: number;

  // @BelongsTo(() => Patient)
  // patient: Patient;

  // @BelongsTo(() => Doctor)
  // doctor: Doctor;

  // @BelongsTo(() => Room)
  // room: Room;
}
