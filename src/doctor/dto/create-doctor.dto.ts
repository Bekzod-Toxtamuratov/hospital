import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDoctorDto {
  @ApiProperty({
    example: 'first_name example',
    description: 'first_name desribtion',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    example: 'last_name example',
    description: 'last_name desribtion',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: 'phone example',
    description: 'phone desribtion',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: 'email  example',
    description: 'email desribtion',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password  example',
    description: 'password desribtion',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'confirm_password  example',
    description: 'confirm_password desribtion',
  })
  @IsString()
  @IsNotEmpty()
  confirm_password;

  // @ApiProperty({
  //   example: 'departmentId  example',
  //   description: 'departmentId desribtion',
  // })
  // @IsNumber()
  // @IsNotEmpty()
  // departmentId: number;

  @ApiProperty({
    example: 'start_work  example',
    description: 'start_work desribtion',
  })
  @IsString()
  @IsNotEmpty()
  start_work: string;

  @ApiProperty({
    example: 'finish_work  example',
    description: 'finish_work desribtion',
  })
  @IsString()
  @IsNotEmpty()
  finish_work: string;


  iamge:string
}
