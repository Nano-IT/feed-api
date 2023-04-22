import {Injectable} from '@nestjs/common';
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from '@nestjs/typeorm';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get('MYSQL_HOST'),
      port: this.configService.get('MYSQL_PORT'),
      username: this.configService.get('MYSQL_USER'),
      password: this.configService.get('MYSQL_PASSWORD'),
      database: this.configService.get('MYSQL_DATABASE'),
      autoLoadEntities: true,
      synchronize: true,
    };
  }
}
