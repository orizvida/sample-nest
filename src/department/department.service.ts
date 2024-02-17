import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Department,
  DepartmentCreate,
  DepartmentUpdate,
} from './department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async create(departmentCreate: DepartmentCreate): Promise<Department> {
    const newDepartment = this.departmentRepository.create(departmentCreate);
    return await this.departmentRepository.save(newDepartment);
  }

  async getAll(): Promise<Department[]> {
    return await this.departmentRepository.find();
  }

  async getById(id: string): Promise<Department | null> {
    return await this.departmentRepository.findOne({
      where: { id },
      relations: ['surveys'],
    });
  }

  async delete(id: string): Promise<void> {
    await this.departmentRepository.delete(id);
  }

  async update(
    id: string,
    departmentUpdate: DepartmentUpdate,
  ): Promise<Department> {
    const department = await this.getById(id);

    if (!department) {
      throw new NotFoundException();
    }

    const updatedDepartment = Object.assign(department, departmentUpdate);
    return await this.departmentRepository.save(updatedDepartment);
  }
}
