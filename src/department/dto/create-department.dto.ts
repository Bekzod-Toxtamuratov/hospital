import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty({
    example: 'bekzodToxtamuratov',
    description: 'Foydalanuvchi fullname',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
