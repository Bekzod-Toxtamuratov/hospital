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

interface IPaymentCreationAttr {
  service_describtion: string;
  cost: number;
  total: number;
  patientId: number;
}
@Table({ tableName: 'payment' })
export class Payment extends Model<Payment, IPaymentCreationAttr> {
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
    example: 'service_describtion example',
    description: 'service_describtion describtion',
  })
  @Column({
    type: DataType.STRING,
  })
  service_describtion: string;

  @ApiProperty({
    example: 'cost example',
    description: 'cost describtion',
  })
  @Column({
    type: DataType.INTEGER,
  })
  cost: number;

  @ApiProperty({
    example: 'total example',
    description: 'total describtion',
  })
  @Column({
    type: DataType.INTEGER,
  })
  total: number;

  @ApiProperty({
    example: 'patientId example',
    description: 'patientId description',
  })
  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(() => Patient)
  patientId: number;

  // @BelongsTo(() => Patient)
  // patient: Patient;
}
