import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'vijay@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'vijay@123' })
  @IsString()
  @MinLength(6)
  password: string;
}
