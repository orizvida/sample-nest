import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';
import { Department } from '../department/department.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

@Entity()
export class Survey {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({
    type: 'jsonb',
    default: null,
    nullable: true,
  })
  @Expose()
  json?: object;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ApiProperty()
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @Column()
  departmentId: string;

  @ApiProperty()
  @ManyToOne((type) => Department, (department) => department.surveys, {
    onDelete: 'CASCADE',
  })
  department: Department[];
}

export class SurveyCreate {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsObject()
  json: object;
}

export class SurveyUpdate extends PartialType(SurveyCreate) {}
