import {IsEmail, IsNotEmpty, Length} from 'class-validator';
import {Match} from '@/shared/validation-rules/match.validation';

export class RegisterDto {
  @Length(2, 128)
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 258)
  password: string;

  @Match('password')
  passwordConfirmation: string;
}
