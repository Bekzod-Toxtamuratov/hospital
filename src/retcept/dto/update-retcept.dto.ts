import { PartialType } from '@nestjs/swagger';
import { CreateRetceptDto } from './create-retcept.dto';

export class UpdateRetceptDto extends PartialType(CreateRetceptDto) {}
