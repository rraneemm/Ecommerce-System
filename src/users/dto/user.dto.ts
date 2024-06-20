import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class userDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  name: string;

  @IsString()
  address: string;
}
