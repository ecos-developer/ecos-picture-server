import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class PaymentHeaderDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Payment proof image input',
    required: false,
  })
  @Transform(({ value }) => (value === '' ? null : value))
  payment_proof_image?: string;
}
