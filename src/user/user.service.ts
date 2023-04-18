import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {HashService} from '@/shared/services/hash.service';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {Repository} from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private hashService: HashService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  save(payload: CreateUserDto) {
    return this.userRepository.save(payload);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(options) {
    return this.userRepository.findOne(options);
  }

  findOneBy(where) {
    return this.userRepository.findOneBy(where);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return await this.userRepository.findOneBy({id});
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
