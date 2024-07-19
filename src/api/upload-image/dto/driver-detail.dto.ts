import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class DriverDetailDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Vehicle image input',
    required: false,
  })
  @Transform(({ value }) => (value === '' ? null : value))
  vehicle_image_file?: string;
}
