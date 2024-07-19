import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class UserDetailDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'User profile image input',
    required: false,
  })
  @Transform(({ value }) => (value === '' ? null : value))
  profile_image_file?: string;
}
