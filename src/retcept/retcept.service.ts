import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRetceptDto } from './dto/create-retcept.dto';
import { UpdateRetceptDto } from './dto/update-retcept.dto';
import { Retcept } from './models/retcept.models';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RetceptService {
  constructor(
    @InjectModel(Retcept) private readonly RetceptRepo: typeof Retcept,
  ) {}
  create(createRetceptDto: CreateRetceptDto) {
    return this.RetceptRepo.create(createRetceptDto);
  }

  findAll() {
    return this.RetceptRepo.findAll();
  }

  async findOne(id: number) {
    const retceptData = await this.RetceptRepo.findByPk(id);

    if (!retceptData) {
      throw new NotFoundException(`retcept type with ID ${id} not found`);
    }
    return retceptData;
  }

  async remove(id: number) {
    try {
      const affectedRows = await this.RetceptRepo.destroy({
        where: { id },
      });
      if (affectedRows > 0) {
        return `retcept with ID ${id} was removed successfully.`;
      } else {
        return `retcept with ID ${id} not found.`;
      }
    } catch (error) {
      throw new Error(`Error removing retcept with ID ${id}: ${error.message}`);
    }
  }

  async update(
    id: number,
    updateRetceptDto: UpdateRetceptDto,
  ): Promise<Retcept> {
    const [numberOfAffectedRows, [updatedRetcept]] =
      await this.RetceptRepo.update(updateRetceptDto, {
        where: { id },
        returning: true,
      });
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`retcept with ID ${id} not found`);
    }
    return updatedRetcept;
  }
}
