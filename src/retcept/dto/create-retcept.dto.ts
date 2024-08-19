import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';


/*  name: string;
  data:string,
  cost:number;
  patienlId: number; */
export class CreateRetceptDto {
  @ApiProperty({
    example: 'name description',
    description: 'name example description',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'data example',
    description: 'data  description',
  })
  @IsString()
  @IsNotEmpty()
  data: string;

  @ApiProperty({
    example: 'cost example',
    description: 'cost description',
  })
  @IsNumber()
  @IsNotEmpty()
  cost: number;

  @ApiProperty({
    example: 'patienlId example',
    description: 'patienlId description',
  })
  @IsNumber()
  @IsNotEmpty()
  patienlId: number;
}
