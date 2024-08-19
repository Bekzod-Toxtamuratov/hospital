
import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Patient } from '../../patient/models/patient.models';

interface IRetceptCreationAttr {
  name: string;
  data:string,
  cost:number;
  patienlId: number;
}
@Table({ tableName: 'retcept' })
export class Retcept extends Model<Retcept, IRetceptCreationAttr> {
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
    example: 'name example',
    description: 'name description',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({
    example: 'cost example',
    description: 'cost description',
  })
  @Column({
    type: DataType.INTEGER,
  })
  cost: number;

  @ApiProperty({
    example: 'patienlId example',
    description: 'patienlId description',
  })
  
  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(()=>Patient)
  patienlId: number;

  // @BelongsTo(()=>Patient)
  // patient: Patient;
}
