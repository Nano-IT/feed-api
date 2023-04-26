import {Injectable} from '@nestjs/common';
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from '@nestjs/typeorm';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.getOrThrow('MYSQL_HOST'),
      port: this.configService.getOrThrow('MYSQL_PORT'),
      username: this.configService.getOrThrow('MYSQL_USER'),
      password: this.configService.getOrThrow('MYSQL_PASSWORD'),
      database: this.configService.getOrThrow('MYSQL_DATABASE'),
      autoLoadEntities: true,
      synchronize: true,
      logger: 'file',
      logging: true,
    };
  }
}
