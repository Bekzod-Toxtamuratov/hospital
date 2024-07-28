import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Room } from './models/room.models';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room)
    private readonly roomRepo: typeof Room,
  ) {}
  create(createroomDto: CreateRoomDto) {
    return this.roomRepo.create(createroomDto);
  }

  findAll() {
    return this.roomRepo.findAll({include:{all: true}});
  }

  async findOne(id: number) {
    const roomData = await this.roomRepo.findByPk(id);

    if (!roomData) {
      throw new NotFoundException(`room type with ID ${id} not found`);
    }
    return roomData;
  }

  async remove(id: number) {
    try {
      const affectedRows = await this.roomRepo.destroy({
        where: { id },
      });
      if (affectedRows > 0) {
        return `room with ID ${id} was removed successfully.`;
      } else {
        return `room with ID ${id} not found.`;
      }
    } catch (error) {
      throw new Error(`Error removing room with ID ${id}: ${error.message}`);
    }
  }

  async update(id: number, updateroomDto: UpdateRoomDto): Promise<Room> {
    const [numberOfAffectedRows, [updatedroom]] = await this.roomRepo.update(
      updateroomDto,
      {
        where: { id },
        returning: true,
      },
    );
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`room with ID ${id} not found`);
    }
    return updatedroom;
  }
}
