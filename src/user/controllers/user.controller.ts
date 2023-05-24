import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  SerializeOptions,
  Delete,
} from '@nestjs/common';
import {UserService} from '../services/user.service';
import {CreateUserDto} from '../dto/create-user.dto';
import {UpdateUserDto} from '../dto/update-user.dto';
import {GROUP_ALL_USERS, GROUP_USER} from '@/user/consts';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.save(createUserDto);
  }

  @Get()
  @SerializeOptions({
    groups: [GROUP_ALL_USERS],
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':username')
  @SerializeOptions({
    groups: [GROUP_USER],
  })
  findOne(@Param('id') username: string) {
    return this.userService.findOneBy({username});
  }

  @Patch(':username')
  update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(username, updateUserDto);
  }

  @Delete(':username')
  delete(@Param('username') username: string) {
    return this.userService.remove(username);
  }
}
