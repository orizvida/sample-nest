import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { resolve } from 'path';
import { Department } from '../department/department.entity';
import { Survey } from '../survey/survey.entity';

config({ path: resolve(__dirname, '../../.env') });

const DataSourceConfig = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  migrations: ['./database/migrations/*'],
  synchronize: false,
  migrationsTableName: 'migrations',
  entities: [Department, Survey],
});

export default DataSourceConfig;
