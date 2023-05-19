import {ApiProperty} from '@nestjs/swagger';
import {UserResponseDto} from '@/user/dto/user-response.dto';

export class CredentialsDto extends UserResponseDto {
  @ApiProperty({example: 'as;lkfjbajnsmdklfnjkasdf.234213laksjhfjbnamsd@'})
  token: string;
}
