import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
export class LoginDoctorDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
