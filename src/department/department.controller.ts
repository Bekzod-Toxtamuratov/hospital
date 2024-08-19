import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Department } from './models/department.models';
import { AdminGuard } from '../guards/admin.guard';

@Controller('department')
@ApiTags('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @ApiOperation({ summary: 'bu yerda qoshilad' })
  @ApiResponse({
    status: 201,
    description: 'The signup created.',
    type: Department,
  })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  @ApiOperation({ summary: 'bu yerda get' })
  @ApiResponse({
    status: 200,
    description: 'The signup desctiption',
    type: [Department],
  })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  @ApiOperation({ summary: 'bu yerda get' })
  @ApiResponse({
    status: 200,
    description: 'The signup desctiption',
    type: Department,
  })
  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(+id);
  }

  @ApiOperation({ summary: 'bu yerda get' })
  @ApiResponse({
    status: 200,
    description: 'The signup desctiption',
    type: Department,
  })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentService.update(+id, updateDepartmentDto);
  }

  @ApiOperation({ summary: 'bu yerda get' })
  @ApiResponse({
    status: 200,
    description: 'The signup desctiption',
    type: Department,
  })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(+id);
  }
}
