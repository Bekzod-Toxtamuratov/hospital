import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Retcept } from '../../retcept/models/retcept.models';
import { Payment } from '../../payment/models/payment.models';
import { Appointment } from '../../appointment/models/appointment.models';

interface IPatientCreationAttr {
  first_name: string;
  last_name: string;
  address: string;
  phone: string;
  email: string;
  hashed_password: string;
  hashed_refresh_token: string;
  is_active: boolean;
  activation_link: string;
}
@Table({ tableName: 'patient' })
export class Patient extends Model<Patient, IPatientCreationAttr> {
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
    example: 'first_name example',
    description: 'first_name describtion',
  })
  @Column({
    type: DataType.STRING,
  })
  first_name: string;

  @ApiProperty({
    example: 'last_name example',
    description: 'last_name describtion',
  })
  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @ApiProperty({
    example: 'address example',
    description: 'address describtion',
  })
  @Column({
    type: DataType.STRING,
  })
  address: string;

  @ApiProperty({
    example: 'phone example',
    description: 'phone describtion',
  })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiProperty({
    example: 'email example',
    description: 'email describtion',
  })
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @ApiProperty({
    example: ' password example',
    description: 'password describtion',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @ApiProperty({
    example: ' hashed_refresh_token example',
    description: 'hashed_refresh_token describtion',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @ApiProperty({
    example: ' is_active example',
    description: 'is_active describtion',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: ' activation_link example',
    description: 'activation_link describtion',
  })
  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  // @HasMany(() => Retcept)
  // retcept: Retcept[];

  
  // @HasMany(() => Appointment)
  // appointment: Appointment[];



}
