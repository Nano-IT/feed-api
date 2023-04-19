import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import {LoginDto} from './dto/login.dto';
import {RegisterDto} from './dto/register.dto';
import {UserService} from '@/user/user.service';
import {HashService} from '@/shared/services/hash.service';
import {RegisterResponseDto} from '@/auth/dto/register-response.dto';
import {JwtService} from '@/auth/services/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async register(payload: RegisterDto) {
    const password = this.hashService.hash(payload.password);
    const saved = await this.userService.save({
      ...payload,
      password,
      isAmbassador: false,
    });
    const token = await this.jwtService.signAsync(payload);
    return new RegisterResponseDto({...saved, token});
  }

  async login(payload: LoginDto) {
    const response = await this.userService.findOneBy({
      email: payload.email,
    });

    if (!response) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const {password, ...user} = response;

    this.checkPassword(payload.password, password);

    return {
      ...user,
      token: await this.jwtService.signAsync({id: user.id}),
    };
  }

  async getCurrentUser(token: string) {
    const {id} = await this.parseUserFromJwt(token);

    return await this.userService.findOne(id);
  }

  async updateUserInfo(token, payload) {
    const {id} = await this.parseUserFromJwt(token);

    await this.userService.update(id, payload);

    return await this.userService.findOne(id);
  }

  async parseUserFromJwt(token) {
    return await this.jwtService.verifyAsync(
      token.replace('Bearer', '').trim(),
    );
  }

  checkPassword(password, hash) {
    const matches = this.hashService.compare(password, hash);

    if (!matches) {
      throw new UnprocessableEntityException('Invalid email or password');
    }
  }
}
