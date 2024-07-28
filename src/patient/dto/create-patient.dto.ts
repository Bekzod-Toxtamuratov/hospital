import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ForeignKey } from 'sequelize-typescript';

export class CreatePatientDto {
  @ApiProperty({
    example: '<EMAIL>',
    description: 'Patient email',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    example: '<first_name>',
    description: 'first_name describtion',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    example: '<last_name>',
    description: 'last_name describtion',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: '<address>',
    description: 'address describtion',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: 'phone example',
    description: 'phone describtion',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: '<password> example',
    description: 'password describtion',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '<confirm_password>',
    description: 'confirm_password describtion',
  })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;
}
