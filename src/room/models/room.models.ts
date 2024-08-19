import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  HasAssociation,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Appointment } from '../../appointment/models/appointment.models';

interface IRoomCreationAttr {
  name: string;
  floor: number;
}
@Table({ tableName: 'room'})
export class Room extends Model<Room, IRoomCreationAttr> {
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
    example: 'name',
    description: 'name data',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({
    example: 'floor example',
    description: 'floor description',
  })
  @Column({
    type: DataType.INTEGER,
  })
  floor: number;

  // @HasMany(() => Appointment)
  // appointments: Appointment[];
}
