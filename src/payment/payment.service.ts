import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './models/payment.models';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment) private readonly PaymentRepo: typeof Payment,
  ) {}
  create(createPaymentDto: CreatePaymentDto) {
    return this.PaymentRepo.create(createPaymentDto);
  }

  findAll() {
    return this.PaymentRepo.findAll({include:{all:true}});
  }

  async findOne(id: number) {
    const paymentData = await this.PaymentRepo.findByPk(id);

    if (!paymentData) {
      throw new NotFoundException(`payment type with ID ${id} not found`);
    }
    return paymentData;
  }

  async remove(id: number) {
    try {
      const affectedRows = await this.PaymentRepo.destroy({
        where: { id },
      });
      if (affectedRows > 0) {
        return `payment with ID ${id} was removed successfully.`;
      } else {
        return `payment with ID ${id} not found.`;
      }
    } catch (error) {
      throw new Error(`Error removing payment with ID ${id}: ${error.message}`);
    }
  }

  async update(
    id: number,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    const [numberOfAffectedRows, [updatedpayment]] =
      await this.PaymentRepo.update(updatePaymentDto, {
        where: { id },
        returning: true,
      });
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`payment with ID ${id} not found`);
    }
    return updatedpayment;
  }
}
