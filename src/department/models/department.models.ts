import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Doctor } from '../../doctor/models/doctor.models';

interface IDepartmentCreationAttr {
  name: string;
}
@Table({ tableName: 'department' })
export class Department extends Model<Department, IDepartmentCreationAttr> {
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
    example: 'BekzodToxtamuratov',
    description: 'Foydalanuvchi fullName',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  //@HasMany(() => Doctor)
  //doctor: Doctor[];
  // }

}
