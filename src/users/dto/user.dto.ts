import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({
    example: 'test2@abc.com',
    description: 'The email of the User',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'abc123',
    description: 'The password of the User',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'test1',
    description: 'The name of the User',
    required: false,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    example: 'road 1, abc street, xyz city, 12345',
    description: 'The address of the User',
    required: false,
  })
  @IsString()
  @IsOptional()
  address: string;
}
