import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateRoomDto {
  @ApiProperty({
    example: 'name example',
    description: 'name desribtion',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'floor example',
    description: 'floor desribtion',
  })
  @IsNumber()
  @IsNotEmpty()
  floor: number;

}
