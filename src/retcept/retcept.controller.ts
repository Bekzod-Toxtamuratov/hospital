import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RetceptService } from './retcept.service';
import { CreateRetceptDto } from './dto/create-retcept.dto';
import { UpdateRetceptDto } from './dto/update-retcept.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Retcept } from './models/retcept.models';

@Controller('retcept')
@ApiTags('retcept')
export class RetceptController {
  constructor(private readonly retceptService: RetceptService) {}

  @ApiOperation({ summary: 'bu yerda qoshilad' })
  @ApiResponse({
    status: 201,
    description: 'The signup created.',
    type: Retcept,
  })
  @Post()
  create(@Body() createRetceptDto: CreateRetceptDto) {
    return this.retceptService.create(createRetceptDto);
  }

  @ApiOperation({ summary: '' })
  @ApiResponse({
    status: 200,
    description: '',
    type: [Retcept],
  })
  @Get()
  findAll() {
    return this.retceptService.findAll();
  }

  @ApiOperation({ summary: '' })
  @ApiResponse({
    status: 200,
    description: '',
    type: Retcept,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.retceptService.findOne(+id);
  }

  @ApiOperation({ summary: '' })
  @ApiResponse({
    status: 200,
    description: '',
    type: Retcept,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRetceptDto: UpdateRetceptDto) {
    return this.retceptService.update(+id, updateRetceptDto);
  }

  @ApiOperation({ summary: '' })
  @ApiResponse({
    status: 200,
    description: '',
    type: Retcept,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.retceptService.remove(+id);
  }
}
