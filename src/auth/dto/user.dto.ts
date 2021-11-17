import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  login: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsString()
  @IsEmail()
  email: string;
}
