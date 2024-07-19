import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteFileDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'testing.png',
    description: 'filename to be deleted',
    required: true,
  })
  filename: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'user',
    description: 'directory [paymment, user, vehicle]',
    required: true,
  })
  directory: string;
}
