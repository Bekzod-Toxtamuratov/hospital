import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({
    example: 'service_describtion example',
    description: 'service_describtion description',
  })
  @IsString()
  @IsNotEmpty()
  service_describtion: string;

  @ApiProperty({
    example: 'total example',
    description: 'total description',
  })
  @IsNumber()
  @IsNotEmpty()
  total: number;

  @ApiProperty({
    example: 'cost example',
    description: 'cost description',
  })
  @IsNumber()
  @IsNotEmpty()
  cost: number;

  @ApiProperty({
    example: 'patientId example',
    description: 'patientId description',
  })
  @IsNumber()
  @IsNotEmpty()
  patientId: number;

  /*  service_describtion: string;
  cost: number;
  total:number;
  patientId: number; */
}
