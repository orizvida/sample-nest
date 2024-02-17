import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Survey } from '../survey/survey.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Department {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @OneToMany(() => Survey, (survey) => survey.department)
  surveys: Survey[];
}

export class DepartmentCreate {
  @ApiProperty()
  @IsString()
  name: string;
}

export class DepartmentUpdate extends PartialType(DepartmentCreate) {
}
