import {IsEmail, IsNotEmpty, Length} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateUserDto {
  @Length(2, 128)
  @IsNotEmpty()
  @ApiProperty({example: 'user'})
  username: string;

  @IsEmail()
  @ApiProperty({example: 'user@example.com'})
  email: string;

  @IsNotEmpty()
  @Length(8, 256)
  @ApiProperty({example: 'pR19osep?W4o*a0*gafe'})
  password: string;

  @IsNotEmpty()
  @Length(2, 256)
  @ApiProperty({example: 'bio'})
  bio?: string;
}
