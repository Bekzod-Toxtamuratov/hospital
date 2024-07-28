import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Department } from '../../department/models/department.models';
import { Appointment } from '../../appointment/models/appointment.models';

interface IDoctorCreationAttr {
  first_name: string;
  last_name: string;
  departmentId: number;
  phone: string;
  email: string;
  password: string;
  hashed_refresh_token: string;
  start_work: string;
  finish_work: string;
  is_active: boolean;
  hashed_password;
  activation_link: string;
  image: string;
}
@Table({ tableName: 'doctor' })
export class Doctor extends Model<Doctor, IDoctorCreationAttr> {
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
    example: 'departmentId example',
    description: 'departmentId describtion',
  })
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
    example: ' start_work example',
    description: 'start_work describtion',
  })
  @Column({
    type: DataType.STRING,
  })
  start_work: string;

  @ApiProperty({
    example: ' start_work example',
    description: 'start_work describtion',
  })
  @Column({
    type: DataType.STRING,
  })
  finish_work: string;

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

  // @ForeignKey(() => Department)
  @Column({
    type: DataType.INTEGER,
  })
  departmentId: number;

  @ApiProperty({
    example: ' image example',
    description: 'image describtion',
  })
  @Column({
    type: DataType.STRING,
  })
  image: string;

  // @BelongsTo(() => Department)
  // department: Department;

  // @HasMany(() => Appointment)
  // appointment: Appointment[];
}
