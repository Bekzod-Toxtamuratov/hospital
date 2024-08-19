import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface IAdminCreationAttr {
  login: string;
  telegram_link: string;
  admin_photo: string;
  hashed_password: string;
  hashed_refresh_token: string;
  is_active: boolean;
  is_creater: boolean;
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, IAdminCreationAttr> {
  @ApiProperty({ example: 1, description: 'admini unikal Id raqami ' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: true, description: 'login  nomi ' })
  @Column({
    type: DataType.STRING(100),
  })
  login: string;

  @ApiProperty({
    example: 'admin_photo example',
    description: ' admin_photo  description',
  })
  @Column({
    type: DataType.STRING(100),
  })
  admin_photo: string;

  @ApiProperty({
    example: 'password example',
    description: 'password  description',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @ApiProperty({
    example: 'true | false',
    description: 'admin  is_activate false | true ',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: 'true | false',
    description: 'is_creator  false | true',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_creator: boolean;

  @ApiProperty({
    example: 'hashed_refresh_token example ',
    description: 'hashed_refresh_token description',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @ApiProperty({
    example: 'telegram_link example ',
    description: 'telegram_link description',
  })
  @Column({
    type: DataType.STRING,
  })
  telegram_link: string;
}
