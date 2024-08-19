import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Payment } from './models/payment.models';
import { AdminGuard } from '../guards/admin.guard';

@Controller('payment')
@ApiTags('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: 'bu yerda qoshilad' })
  @ApiResponse({
    status: 201,
    description: 'The signup created.',
    type: Payment,
  })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @ApiOperation({ summary: 'bu yerda getALL' })
  @ApiResponse({
    status: 200,
    description: 'The  describtion.',
    type: [Payment],
  })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @ApiOperation({ summary: 'bu yerda getbyId' })
  @ApiResponse({
    status: 200,
    description: 'The  describtion.',
    type: Payment,
  })
  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @ApiOperation({ summary: 'bu yerda getALL' })
  @ApiResponse({
    status: 200,
    description: 'The signup describtion.',
    type: Payment,
  })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @ApiOperation({ summary: 'bu yerda deletebyId' })
  @ApiResponse({
    status: 200,
    description: 'The signup describtion.',
    type: Payment,
  })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
