import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
/*  patientId:number;
  doctorId:number;
  roomId:number;
  data:string;
  time:string;
  diagnostik:string;
  treatments:string; */
export class CreateAppointmentDto {
  @ApiProperty({
    example: 'data example',
    description: 'data desribtion',
  })
  // @IsString()
  // @IsNotEmpty()
  data: string;

  @ApiProperty({
    example: 'time example',
    description: 'time desribtion',
  })
  @IsString()
  @IsNotEmpty()
  time: string;

  @ApiProperty({
    example: 'diagnostik example',
    description: 'diagnostik desribtion',
  })
  @IsString()
  @IsNotEmpty()
  diagnostik: string;

  @ApiProperty({
    example: 'treatments example',
    description: 'treatments desribtion',
  })
  @IsString()
  @IsNotEmpty()
  treatments: string;

  @ApiProperty({
    example: 'doctorId example',
    description: 'doctorId desribtion',
  })
  @IsNumber()
  @IsNotEmpty()
  doctorId: number;

  @ApiProperty({
    example: 'roomId example',
    description: 'roomId desribtion',
  })
  @IsNumber()
  @IsNotEmpty()
  roomId: number;

  @ApiProperty({
    example: 'patientId example',
    description: 'patientId desribtion',
  })
  @IsNumber()
  @IsNotEmpty()
  patientId: number;
}
