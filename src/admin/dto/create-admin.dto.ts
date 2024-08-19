import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'login example', description: 'login description' })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    example: 'password example',
    description: 'password description',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    example: 'admin_photo example',
    description: 'admin_photo description',
  })
  @IsNotEmpty()
  @IsString()
  admin_photo: string;

  @ApiProperty({
    example: 'telegram_link example',
    description: 'telegram_link description',
  })
  @IsNotEmpty()
  @IsString()
  telegram_link: string;
}
