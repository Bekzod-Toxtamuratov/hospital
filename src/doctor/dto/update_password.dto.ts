import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDoctorDto {
  @IsString()
  @IsNotEmpty()
  old_password: string;

  @IsString()
  @IsNotEmpty()
  new_password: string;

  @IsString()
  @IsNotEmpty()
  confirm_password: string;
}
