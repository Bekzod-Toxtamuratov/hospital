import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Department } from './models/department.models';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department) private readonly departmentRepo: typeof Department,
  ) {}
  create(createDepartmentDto: CreateDepartmentDto) {
    return this.departmentRepo.create(createDepartmentDto);
  }

  findAll() {
    return this.departmentRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const departmentData = await this.departmentRepo.findByPk(id);

    if (!departmentData) {
      throw new NotFoundException(`department type with ID ${id} not found`);
    }
    return departmentData;
  }

  async remove(id: number) {
    try {
      const affectedRows = await this.departmentRepo.destroy({
        where: { id },
      });
      if (affectedRows > 0) {
        return `department with ID ${id} was removed successfully.`;
      } else {
        return `department with ID ${id} not found.`;
      }
    } catch (error) {
      throw new Error(
        `Error removing department with ID ${id}: ${error.message}`,
      );
    }
  }

  async update(
    id: number,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Department> {
    const [numberOfAffectedRows, [updatedDepartment]] =
      await this.departmentRepo.update(updateDepartmentDto, {
        where: { id },
        returning: true,
      });
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`department with ID ${id} not found`);
    }
    return updatedDepartment;
  }
}
