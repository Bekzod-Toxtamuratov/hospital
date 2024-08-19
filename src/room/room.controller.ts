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
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Room } from './models/room.models';
import { Admin } from '../admin/models/admin.models';
import { AdminGuard } from '../guards/admin.guard';

@Controller('room')
@ApiTags('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiOperation({ summary: 'bu yerda qoshilad' })
  @ApiResponse({
    status: 201,
    description: 'The signup created.',
    type: Room,
  })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @ApiOperation({ summary: 'bu yerda getAll' })
  @ApiResponse({
    status: 201,
    description: 'The  .',
    type: [Room],
  })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @ApiOperation({ summary: 'bu yerda get' })
  @ApiResponse({
    status: 201,
    description: 'The  .',
    type: Room,
  })
  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'bu yerda edit qiliadi' })
  @ApiResponse({
    status: 201,
    description: 'The  .',
    type: Room,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(+id, updateRoomDto);
  }

  @ApiOperation({ summary: 'bu yerda delete qiliadi' })
  @ApiResponse({
    status: 201,
    description: 'The  .',
    type: Room,
  })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
  }
}
