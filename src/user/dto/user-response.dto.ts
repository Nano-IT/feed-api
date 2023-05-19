import {ApiProperty} from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({example: 22})
  id: number;

  @ApiProperty({example: 'user@example.com'})
  email: string;

  @ApiProperty({example: 'user'})
  username: string;

  @ApiProperty({example: 'User likes cats.'})
  bio: string;

  @ApiProperty({type: UserResponseDto, isArray: true})
  followers: UserResponseDto[];

  @ApiProperty({example: false})
  following: boolean;
}
