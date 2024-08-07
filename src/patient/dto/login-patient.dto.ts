import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
export class LoginPatientDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
