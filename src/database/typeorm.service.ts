import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from '../config/configuration';
import { Survey } from 'src/survey/survey.entity';
import { Department } from 'src/department/department.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>(POSTGRES_HOST),
      port: this.configService.get<number>(POSTGRES_PORT),
      username: this.configService.get<string>(POSTGRES_USER),
      password: this.configService.get<string>(POSTGRES_PASSWORD),
      database: this.configService.get<string>(POSTGRES_DB),
      autoLoadEntities: true,
      entities: [Department, Survey],
    };
  }
}
