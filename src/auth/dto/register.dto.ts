import {IsEmail, IsNotEmpty, Length} from 'class-validator';
import {Match} from '@/shared/validation-rules/match.validation';
import {ApiProperty} from '@nestjs/swagger';

export class RegisterDto {
  @Length(2, 128)
  @IsNotEmpty()
  @ApiProperty({example: 'user'})
  username: string;

  @IsEmail()
  @ApiProperty({example: 'user@example.com'})
  email: string;

  @IsNotEmpty()
  @Length(8, 258)
  @ApiProperty({example: 'pR19osep?W4o*a0*gafe'})
  password: string;

  @Match('password')
  @ApiProperty({example: 'pR19osep?W4o*a0*gafe'})
  passwordConfirmation: string;
}
