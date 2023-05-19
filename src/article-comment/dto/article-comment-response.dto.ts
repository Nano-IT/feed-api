import {ApiProperty} from '@nestjs/swagger';
import {UserResponseDto} from '@/user/dto/user-response.dto';

export class ArticleCommentResponseDto {
  @ApiProperty({example: 'An example of article comment'})
  body: string;

  @ApiProperty({type: UserResponseDto})
  author: UserResponseDto;
}
