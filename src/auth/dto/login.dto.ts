import {IsEmail, IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({example: 'user@example.com'})
  email: string;

  @IsNotEmpty()
  @ApiProperty({example: 'pR19osep?W4o*a0*gafe'})
  password: string;
}
