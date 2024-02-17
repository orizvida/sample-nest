import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Department, DepartmentCreate } from './department.entity';

@ApiTags('department')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @ApiResponse({
    status: 200,
    description: 'Get all departments',
    type: Department,
    isArray: true,
  })
  @Get()
  async getAll(): Promise<Department[]> {
    const all = await this.departmentService.getAll();
    return all;
  }

  @ApiResponse({
    status: 200,
    description: 'Get department by id',
    type: Department,
  })
  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string): Promise<Department> {
    return await this.departmentService.getById(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Create a new department',
    type: Department,
  })
  @HttpCode(HttpStatus.OK)
  @Post()
  async create(
    @Body() departmnentCreate: DepartmentCreate,
  ): Promise<Department> {
    return await this.departmentService.create(departmnentCreate);
  }

  @ApiResponse({
    status: 200,
    description: 'Update a department',
    type: Department,
  })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() departmentUpdate: DepartmentCreate,
  ): Promise<Department> {
    return await this.departmentService.update(id, departmentUpdate);
  }

  @ApiResponse({
    status: 200,
    type: null,
  })
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.departmentService.delete(id);
  }
}
